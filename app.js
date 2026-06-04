/**
 * app.js
 * 3年次 科目選択ナビ
 *
 * data.js の window.COURSE_SELECTOR_DATA を読み込み、
 * 志望型選択・履修モデル表示・選択変更・単位計算・エラー判定を行います。
 */

(function () {
  "use strict";

  const DATA = window.COURSE_SELECTOR_DATA;

  if (!DATA) {
    document.body.innerHTML = `
      <main style="max-width: 760px; margin: 40px auto; padding: 24px; font-family: sans-serif;">
        <h1>データを読み込めませんでした</h1>
        <p><code>data.js</code> が正しく読み込まれているか確認してください。</p>
      </main>
    `;
    return;
  }

  const {
    CONFIG,
    REQUIRED_COURSES = [],
    PROFILES,
    COURSES,
    EXCLUSIVE_GROUPS,
    MODELS,
    RULES
  } = DATA;

  const courseMap = new Map(COURSES.map((course) => [course.id, course]));
  const profileMap = new Map(PROFILES.map((profile) => [profile.id, profile]));

  const state = {
    profileId: null,
    groupSelections: {},
    recommendedSelected: new Set()
  };

  const $ = (selector) => document.querySelector(selector);

  const elements = {
    globalNotes: $("#global-notes"),
    profileList: $("#profile-list"),
    modelSummary: $("#model-summary"),
    customOptions: $("#custom-options"),
    unitSummary: $("#unit-summary"),
    selectedCourses: $("#selected-courses"),
    errors: $("#errors"),
    warnings: $("#warnings"),
    infos: $("#infos"),
    printPreview: $("#print-preview"),
    printButton: $("#print-button"),
    resetButton: $("#reset-button"),
    mobileStatusProfile: $("#mobile-status-profile"),
    mobileStatusUnits: $("#mobile-status-units"),
    mobileStatusAlert: $("#mobile-status-alert")
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(value);
    }
    return String(value).replace(/"/g, "\\\"");
  }

  function getCourse(id) {
    return courseMap.get(id);
  }

  function getCourseName(id) {
    const course = getCourse(id);
    return course ? course.name : id;
  }

  function getCourses(ids) {
    return ids
      .map((id) => getCourse(id))
      .filter(Boolean);
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function sumCredits(courseIds) {
    return unique(courseIds).reduce((total, id) => {
      const course = getCourse(id);
      return total + (course ? course.credits : 0);
    }, 0);
  }

  function sortCourseIds(courseIds) {
    return unique(courseIds).sort((a, b) => {
      const courseA = getCourse(a);
      const courseB = getCourse(b);
      const codeA = courseA ? courseA.code : 9999;
      const codeB = courseB ? courseB.code : 9999;
      return codeA - codeB;
    });
  }

  function renderGlobalNotes() {
    if (!elements.globalNotes || !CONFIG.notes) return;

    elements.globalNotes.innerHTML = CONFIG.notes
      .map((note) => `<li>${escapeHtml(note)}</li>`)
      .join("");
  }

  function renderProfiles() {
    elements.profileList.innerHTML = PROFILES.map((profile) => {
      const isActive = profile.id === state.profileId ? " is-active" : "";
      return `
        <button class="profile-card${isActive}" type="button" data-profile-id="${escapeHtml(profile.id)}">
          <span class="profile-card__category">${escapeHtml(profile.category)}</span>
          <span class="profile-card__title">${escapeHtml(profile.name)}</span>
          <p class="profile-card__description">${escapeHtml(profile.description)}</p>
          ${profile.notice ? `<p class="profile-card__notice">${escapeHtml(profile.notice)}</p>` : ""}
        </button>
      `;
    }).join("");

    elements.profileList.querySelectorAll("[data-profile-id]").forEach((button) => {
      button.addEventListener("click", () => {
        selectProfile(button.dataset.profileId);
      });
    });
  }

  function selectProfile(profileId) {
    const model = MODELS[profileId];
    if (!model) return;

    state.profileId = profileId;
    state.groupSelections = {};
    state.recommendedSelected = new Set(model.recommended || []);

    initialiseGroupSelections(model);

    renderProfiles();
    renderAll();

    const target = document.getElementById("model-title");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initialiseGroupSelections(model) {
    (model.selectableGroups || []).forEach((group) => {
      if (group.type === "single") {
        state.groupSelections[group.id] = group.required ? (group.options[0] || null) : null;
        return;
      }

      if (group.type === "single_set" || group.type === "multi_set") {
        const firstOption = group.options[0];
        state.groupSelections[group.id] = group.required && firstOption
          ? [...firstOption.courseIds]
          : [];
        return;
      }

      if (group.type === "choose_exactly") {
        const count = group.count || 0;
        state.groupSelections[group.id] = group.required
          ? group.options.slice(0, count)
          : [];
      }
    });
  }

  function renderAll() {
    renderModelSummary();
    renderCustomOptions();
    renderResult();
  }

  function renderModelSummary() {
    const model = getCurrentModel();

    if (!model) {
      elements.modelSummary.className = "model-summary empty-state";
      elements.modelSummary.textContent = "志望型を選択すると、ここに履修モデルが表示されます。";
      return;
    }

    const profile = profileMap.get(model.profileId);
    const requiredCourses = getCourses(model.required || []);
    const recommendedCourses = getCourses(model.recommended || []);
    const lockedOutCourses = getCourses(model.lockedOut || []);

    elements.modelSummary.className = "model-summary";
    elements.modelSummary.innerHTML = `
      <h3 class="model-title">${escapeHtml(model.name)}</h3>
      <p class="model-description">${escapeHtml(profile ? profile.description : "")}</p>

      <h4>3年次必修科目</h4>
      ${renderBadgeRow(REQUIRED_COURSES, "badge--required", "必修")}

      <h4>自由選択内の原則必須・固定科目</h4>
      ${renderBadgeRow(requiredCourses, "badge--locked", "固定")}

      <h4>モデル上の推奨科目です。</h4>
      ${recommendedCourses.length
        ? renderBadgeRow(recommendedCourses, "badge--recommended", "推奨")
        : `<p class="empty-state">このモデルに自動設定された推奨科目はありません。</p>`}

      <h4>原則選択対象外</h4>
      ${lockedOutCourses.length
        ? renderBadgeRow(lockedOutCourses, "badge--blocked", "対象外")
        : `<p class="empty-state">このモデルで特に除外している科目はありません。</p>`}
    `;
  }

  function renderBadgeRow(courses, modifierClass, label) {
    if (!courses.length) {
      return `<p class="empty-state">該当科目はありません。</p>`;
    }

    return `
      <div class="badge-row">
        ${courses.map((course) => `
          <span class="badge ${modifierClass}">
            ${escapeHtml(label)}：${escapeHtml(course.name)}（${course.credits}単位）
          </span>
        `).join("")}
      </div>
    `;
  }


  function getOutsideOptionalGroup() {
    return {
      id: "outside_optional",
      label: "モデル外の任意選択",
      type: "single",
      required: false,
      options: ["pe", "music", "art", "calligraphy"],
      note: "これらは履修モデル上の中核科目ではありません。必要単位数、受験科目、時間割上の制約を確認したうえで選択してください。"
    };
  }

  function renderCustomOptions() {
    const model = getCurrentModel();

    if (!model) {
      elements.customOptions.className = "custom-options empty-state";
      elements.customOptions.textContent = "志望型を選択すると、変更可能な科目群が表示されます。";
      return;
    }

    elements.customOptions.className = "custom-options";
    const sections = [];

    if ((model.recommended || []).length > 0) {
      sections.push(renderRecommendedSection(model));
    }

    (model.selectableGroups || []).forEach((group) => {
      sections.push(renderGroup(group));
    });

    sections.push(renderGroup(getOutsideOptionalGroup()));

    if (sections.length === 0) {
      elements.customOptions.innerHTML = `<div class="empty-state">このモデルで変更可能な科目はありません。</div>`;
      return;
    }

    elements.customOptions.innerHTML = sections.join("");
    attachCustomOptionEvents(model);
  }

  function renderRecommendedSection(model) {
    const recommendedCourses = getCourses(model.recommended || []);

    return `
      <section class="group-card" data-group-type="recommended">
        <div class="group-card__header">
          <div>
            <h3 class="group-card__title">モデル上の推奨科目です。</h3>
            <p class="group-card__note">モデル上の推奨科目です。</p>
          </div>
        </div>

        <div class="option-list">
          ${recommendedCourses.map((course) => `
            <label class="option-item">
              <input
                type="checkbox"
                data-recommended-course="${escapeHtml(course.id)}"
                ${state.recommendedSelected.has(course.id) ? "checked" : ""}
              />
              <span class="option-item__main">
                <span class="option-item__name">${escapeHtml(course.name)}</span>
                <span class="option-item__meta">
                  <span>${escapeHtml(course.subject)}</span>
                  <span>${course.credits}単位</span>
                  <span>講座コード ${course.code}</span>
                </span>
                <span class="option-item__description">
                  ${state.profileId === "science_tokyo_kyoto" && course.id === "kobun_gamma"
                    ? `<span class="strong-recommendation-warning">【注意！】重要科目です。外すと自学での対策が必須になります。受講を強く推奨します。</span><br>`
                    : ""}
                  ${escapeHtml(course.description)}
                </span>
              </span>
            </label>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderGroup(group) {
    const isRequired = group.required
      ? `<span class="required-label">必須選択</span>`
      : `<span class="required-label">任意</span>`;

    return `
      <section class="group-card" data-group-id="${escapeHtml(group.id)}">
        <div class="group-card__header">
          <div>
            <h3 class="group-card__title">${escapeHtml(group.label)}</h3>
            ${group.note ? `<p class="group-card__note">${escapeHtml(group.note)}</p>` : ""}
          </div>
          ${isRequired}
        </div>

        <div class="option-list">
          ${renderGroupOptions(group)}
        </div>
      </section>
    `;
  }

  function renderGroupOptions(group) {
    if (group.type === "single") {
      const selected = state.groupSelections[group.id];

      const noneOption = !group.required
        ? `
          <label class="option-item">
            <input
              type="radio"
              name="${escapeHtml(group.id)}"
              data-group-id="${escapeHtml(group.id)}"
              data-option-kind="single"
              value=""
              ${selected ? "" : "checked"}
            />
            <span class="option-item__main">
              <span class="option-item__name">選択しない</span>
              <span class="option-item__description">この科目群からは選択しません。</span>
            </span>
          </label>
        `
        : "";

      const courseOptions = group.options.map((courseId) => {
        const course = getCourse(courseId);
        if (!course) return "";

        return `
          <label class="option-item">
            <input
              type="radio"
              name="${escapeHtml(group.id)}"
              data-group-id="${escapeHtml(group.id)}"
              data-option-kind="single"
              value="${escapeHtml(course.id)}"
              ${selected === course.id ? "checked" : ""}
            />
            <span class="option-item__main">
              <span class="option-item__name">${escapeHtml(course.name)}</span>
              <span class="option-item__meta">
                <span>${escapeHtml(course.subject)}</span>
                <span>${course.credits}単位</span>
                <span>講座コード ${course.code}</span>
              </span>
              <span class="option-item__description">${escapeHtml(course.description)}</span>
            </span>
          </label>
        `;
      }).join("");

      return noneOption + courseOptions;
    }

    if (group.type === "single_set" || group.type === "multi_set") {
      const selectedIds = state.groupSelections[group.id] || [];
      const selectedKey = selectedIds.join(",");

      const noneOption = !group.required
        ? `
          <label class="option-item">
            <input
              type="radio"
              name="${escapeHtml(group.id)}"
              data-group-id="${escapeHtml(group.id)}"
              data-option-kind="set"
              value=""
              ${selectedIds.length === 0 ? "checked" : ""}
            />
            <span class="option-item__main">
              <span class="option-item__name">選択しない</span>
              <span class="option-item__description">この科目群からは選択しません。</span>
            </span>
          </label>
        `
        : "";

      const setOptions = group.options.map((option, index) => {
        const optionIds = option.courseIds || [];
        const optionKey = optionIds.join(",");
        const courses = getCourses(optionIds);
        const credits = sumCredits(optionIds);

        return `
          <label class="option-item">
            <input
              type="radio"
              name="${escapeHtml(group.id)}"
              data-group-id="${escapeHtml(group.id)}"
              data-option-kind="set"
              data-option-index="${index}"
              value="${escapeHtml(optionKey)}"
              ${selectedKey === optionKey ? "checked" : ""}
            />
            <span class="option-item__main">
              <span class="option-item__name">${escapeHtml(option.label)}</span>
              <span class="option-item__meta">
                <span>${credits}単位</span>
                <span>${escapeHtml(courses.map((course) => course.name).join("・"))}</span>
              </span>
            </span>
          </label>
        `;
      }).join("");

      return noneOption + setOptions;
    }

    if (group.type === "choose_exactly") {
      const selectedIds = new Set(state.groupSelections[group.id] || []);
      const countLabel = group.count ? `${group.count}科目選択` : "複数選択";

      return `
        <div class="option-item" aria-hidden="true">
          <span></span>
          <span class="option-item__main">
            <span class="option-item__name">${escapeHtml(countLabel)}</span>
            <span class="option-item__description">必要な数に合うようにチェックしてください。</span>
          </span>
        </div>
        ${group.options.map((courseId) => {
          const course = getCourse(courseId);
          if (!course) return "";

          return `
            <label class="option-item">
              <input
                type="checkbox"
                data-group-id="${escapeHtml(group.id)}"
                data-option-kind="choose-exactly"
                value="${escapeHtml(course.id)}"
                ${selectedIds.has(course.id) ? "checked" : ""}
              />
              <span class="option-item__main">
                <span class="option-item__name">${escapeHtml(course.name)}</span>
                <span class="option-item__meta">
                  <span>${escapeHtml(course.subject)}</span>
                  <span>${course.credits}単位</span>
                  <span>講座コード ${course.code}</span>
                </span>
                <span class="option-item__description">${escapeHtml(course.description)}</span>
              </span>
            </label>
          `;
        }).join("")}
      `;
    }

    return `<div class="empty-state">未対応の選択形式です。</div>`;
  }

  function attachCustomOptionEvents(model) {
    elements.customOptions.querySelectorAll("[data-recommended-course]").forEach((input) => {
      input.addEventListener("change", () => {
        const courseId = input.dataset.recommendedCourse;
        if (input.checked) {
          state.recommendedSelected.add(courseId);
        } else {
          state.recommendedSelected.delete(courseId);
        }
        renderResult();
      });
    });

    elements.customOptions.querySelectorAll("[data-option-kind='single']").forEach((input) => {
      input.addEventListener("change", () => {
        const groupId = input.dataset.groupId;
        state.groupSelections[groupId] = input.value || null;
        renderResult();
      });
    });

    elements.customOptions.querySelectorAll("[data-option-kind='set']").forEach((input) => {
      input.addEventListener("change", () => {
        const groupId = input.dataset.groupId;
        const optionIndex = input.dataset.optionIndex;

        if (input.value === "") {
          state.groupSelections[groupId] = [];
          renderResult();
          return;
        }

        const group = (model.selectableGroups || []).find((item) => item.id === groupId);
        const option = group && group.options[Number(optionIndex)];
        state.groupSelections[groupId] = option ? [...option.courseIds] : [];
        renderResult();
      });
    });

    elements.customOptions.querySelectorAll("[data-option-kind='choose-exactly']").forEach((input) => {
      input.addEventListener("change", () => {
        const groupId = input.dataset.groupId;
        const selected = Array.from(
          elements.customOptions.querySelectorAll(`[data-group-id="${cssEscape(groupId)}"][data-option-kind="choose-exactly"]:checked`)
        ).map((checkedInput) => checkedInput.value);

        state.groupSelections[groupId] = selected;
        renderResult();
      });
    });
  }

  function getCurrentModel() {
    return state.profileId ? MODELS[state.profileId] : null;
  }

  function collectSelectedCourseIds() {
    const model = getCurrentModel();
    if (!model) return [];

    const ids = [];

    ids.push(...(model.required || []));
    ids.push(...Array.from(state.recommendedSelected));

    Object.values(state.groupSelections).forEach((selection) => {
      if (!selection) return;

      if (Array.isArray(selection)) {
        ids.push(...selection);
      } else {
        ids.push(selection);
      }
    });

    return sortCourseIds(ids);
  }

  function renderResult() {
    const model = getCurrentModel();

    if (!model) {
      elements.unitSummary.className = "unit-summary empty-state";
      elements.unitSummary.textContent = "単位数はここに表示されます。";
      elements.selectedCourses.className = "selected-courses empty-state";
      elements.selectedCourses.textContent = "必修科目と自由選択科目はここに表示されます。";
      renderMessages([], [], []);
      renderPrintPreview();
      updateMobileStatus(null, 0, { errors: [], warnings: [], infos: [] });
      return;
    }

    const selectedIds = collectSelectedCourseIds();
    const electiveCredits = sumCredits(selectedIds);
    const totalCredits = CONFIG.requiredCredits + electiveCredits;
    const electiveOk = electiveCredits >= CONFIG.electiveMinCredits && electiveCredits <= CONFIG.electiveMaxCredits;
    const totalOk = totalCredits >= CONFIG.totalMinCredits && totalCredits <= CONFIG.totalMaxCredits;

    elements.unitSummary.className = "unit-summary";
    elements.unitSummary.innerHTML = `
      <div class="unit-grid">
        <div class="unit-row">
          <span class="unit-label">必修科目</span>
          <span class="unit-value">${CONFIG.requiredCredits}単位</span>
        </div>
        <div class="unit-row">
          <span class="unit-label">自由選択科目</span>
          <span class="unit-value ${electiveOk ? "is-ok" : "is-error"}">${electiveCredits}単位</span>
        </div>
        <div class="unit-row">
          <span class="unit-label">合計</span>
          <span class="unit-value ${totalOk ? "is-ok" : "is-error"}">${totalCredits}単位</span>
        </div>
        <div class="unit-row">
          <span class="unit-label">自由選択の条件</span>
          <span class="unit-value">${CONFIG.electiveMinCredits}〜${CONFIG.electiveMaxCredits}単位</span>
        </div>
      </div>
    `;

    elements.selectedCourses.className = "selected-courses";
    elements.selectedCourses.innerHTML = `
      <div class="course-section">
        <h3 class="course-section__title">必修科目（10単位）</h3>
        ${renderRequiredCourseList()}
      </div>
      <div class="course-section">
        <h3 class="course-section__title">自由選択科目（${electiveCredits}単位）</h3>
        ${renderSelectedCourseList(selectedIds)}
      </div>
    `;

    const messages = validateSelection(selectedIds);
    renderMessages(messages.errors, messages.warnings, messages.infos);
    renderPrintPreview(selectedIds, messages, electiveCredits, totalCredits);
    updateMobileStatus(model, electiveCredits, messages);
  }

  function renderSelectedCourseList(selectedIds) {
    if (!selectedIds.length) {
      return `<div class="empty-state">まだ科目が選択されていません。</div>`;
    }

    return `
      <ul class="course-list">
        ${selectedIds.map((id) => {
          const course = getCourse(id);
          if (!course) return "";

          return `
            <li class="course-item">
              <span class="course-code">${course.code}</span>
              <span>
                <span class="course-name">${escapeHtml(course.name)}</span>
                <span class="course-subject">${escapeHtml(course.subject)}／${escapeHtml(course.type)}</span>
              </span>
              <span class="course-credits">${course.credits}単位</span>
            </li>
          `;
        }).join("")}
      </ul>
    `;
  }


  function renderRequiredCourseList() {
    if (!REQUIRED_COURSES || REQUIRED_COURSES.length === 0) {
      return `<div class="empty-state">必修科目データが登録されていません。</div>`;
    }

    return `
      <ul class="course-list required-course-list">
        ${REQUIRED_COURSES.map((course) => `
          <li class="course-item course-item--required">
            <span class="course-code">必</span>
            <span>
              <span class="course-name">${escapeHtml(course.name)}</span>
              <span class="course-subject">${escapeHtml(course.subject)}／${escapeHtml(course.type)}</span>
            </span>
            <span class="course-credits">${course.credits}単位</span>
          </li>
        `).join("")}
      </ul>
    `;
  }

  function validateSelection(selectedIds) {
    const model = getCurrentModel();
    const selectedSet = new Set(selectedIds);
    const errors = [];
    const warnings = [];
    const infos = [];

    const electiveCredits = sumCredits(selectedIds);

    if (electiveCredits < CONFIG.electiveMinCredits) {
      errors.push(`自由選択科目が${electiveCredits}単位です。${CONFIG.electiveMinCredits}単位以上にしてください。`);
    }

    if (electiveCredits > CONFIG.electiveMaxCredits) {
      errors.push(`自由選択科目が${electiveCredits}単位です。${CONFIG.electiveMaxCredits}単位以内にしてください。`);
    }

    validateRequiredGroups(model, selectedSet, errors);
    validateExclusiveGroups(selectedSet, errors);
    validateCourseSets(selectedSet, errors);
    validateBlockedByProfile(model, selectedSet, errors, warnings);
    validateConsultation(selectedSet, warnings);
    validateImportantWarnings(model, selectedSet, warnings, infos);
    validateModelWarnings(model, warnings, infos);

    return {
      errors: unique(errors),
      warnings: unique(warnings),
      infos: unique(infos)
    };
  }

  function validateRequiredGroups(model, selectedSet, errors) {
    (model.selectableGroups || []).forEach((group) => {
      if (!group.required) return;

      const selection = state.groupSelections[group.id];

      if (group.type === "single") {
        if (!selection) {
          errors.push(`「${group.label}」を選択してください。`);
        }
      }

      if (group.type === "single_set" || group.type === "multi_set") {
        if (!selection || selection.length === 0) {
          errors.push(`「${group.label}」を選択してください。`);
        }
      }

      if (group.type === "choose_exactly") {
        const count = Array.isArray(selection) ? selection.length : 0;
        const requiredCount = group.count || 0;
        if (count !== requiredCount) {
          errors.push(`「${group.label}」は${requiredCount}科目選択してください。現在は${count}科目です。`);
        }
      }
    });
  }

  function validateExclusiveGroups(selectedSet, errors) {
    EXCLUSIVE_GROUPS.forEach((group) => {
      const selectedInGroup = group.courseIds.filter((id) => selectedSet.has(id));

      if (selectedInGroup.length > group.max) {
        const names = selectedInGroup.map(getCourseName).join("・");
        errors.push(`${group.message}（現在：${names}）`);
      }
    });
  }

  function validateCourseSets(selectedSet, errors) {
    const has = (id) => selectedSet.has(id);

    if (has("math_iii") !== has("math_gamma")) {
      errors.push("数学Ⅲと数学演習γはセットで選択してください。");
    }

    const worldA = has("world_history_a");
    const worldB = has("world_history_b");
    const japanA = has("japanese_history_a");
    const japanB = has("japanese_history_b");

    if (worldB && !worldA) {
      errors.push("世界史探究演習bは、世界史探究演習aとセットでなければ選択できません。");
    }

    if (japanB && !japanA) {
      errors.push("日本史探究演習bは、日本史探究演習aとセットでなければ選択できません。");
    }

    const japanAWithoutBAllowed = japanA && !japanB && worldA && worldB;

    if (worldA && !worldB) {
      errors.push("世界史探究演習aを選択する場合、世界史探究演習bも選択してください。日本史6単位＋世界史4単位のパターンは設定されていません。");
    }

    if (japanA && !japanB && !japanAWithoutBAllowed) {
      errors.push("日本史探究演習aを選択する場合、原則として日本史探究演習bも選択してください。特例の場合は世界史6単位＋日本史4単位の形にしてください。");
    }

    const hasPublic = has("public_studies");
    const hasEthics = has("ethics");
    const hasPolitics = has("politics_economics");

    if (hasPublic && !hasEthics && !hasPolitics) {
      errors.push("公共演習は、倫理または政治・経済とセットで選択してください。");
    }

    if ((hasEthics || hasPolitics) && !hasPublic) {
      errors.push("倫理または政治・経済を選択する場合、公共演習も選択してください。");
    }

    if (hasEthics && hasPolitics) {
      errors.push("倫理と政治・経済は、原則としてどちらか一方を選択してください。");
    }

    const basicScienceIds = ["basic_physics", "basic_chemistry", "basic_biology"];
    const selectedBasics = basicScienceIds.filter((id) => has(id));

    if (selectedBasics.length > 0 && selectedBasics.length !== 2) {
      errors.push(`理科基礎演習は3科目から2科目を選択してください。現在は${selectedBasics.length}科目です。`);
    }
  }

  function validateBlockedByProfile(model, selectedSet, errors, warnings) {
    if (!RULES.blockedByProfile) return;

    RULES.blockedByProfile.forEach((rule) => {
      if (!rule.profileIds.includes(model.profileId)) return;

      const blockedSelected = rule.blockedCourseIds.filter((id) => selectedSet.has(id));

      if (blockedSelected.length === 0) return;

      const message = `${rule.message}（該当：${blockedSelected.map(getCourseName).join("・")}）`;

      if (rule.severity === "error") {
        errors.push(message);
      } else {
        warnings.push(message);
      }
    });
  }

  function validateConsultation(selectedSet, warnings) {
    COURSES.forEach((course) => {
      if (selectedSet.has(course.id) && course.consultRequired) {
        warnings.push(`「${course.name}」は受講前に担当教員への事前相談・面談が必要です。`);
      }
    });
  }

  function validateImportantWarnings(model, selectedSet, warnings, infos) {
    (RULES.importantWarnings || []).forEach((rule) => {
      if (rule.profileIds && !rule.profileIds.includes(model.profileId)) return;

      const shouldTrigger = (rule.courseIds || []).every((id) => selectedSet.has(id));
      if (!shouldTrigger) return;

      if (rule.severity === "info") {
        infos.push(rule.message);
      } else {
        warnings.push(rule.message);
      }
    });
  }

  function validateModelWarnings(model, warnings, infos) {
    (model.warnings || []).forEach((message) => warnings.push(message));
    (model.selfStudy || []).forEach((message) => infos.push(`自学・講習・質問対応：${message}`));
  }

  function updateMobileStatus(model, electiveCredits, messages) {
    if (!elements.mobileStatusProfile || !elements.mobileStatusUnits || !elements.mobileStatusAlert) {
      return;
    }

    if (!model) {
      elements.mobileStatusProfile.textContent = "未選択";
      elements.mobileStatusUnits.textContent = "自由選択 0単位";
      elements.mobileStatusAlert.textContent = "確認";
      elements.mobileStatusAlert.className = "mobile-status__alert";
      return;
    }

    elements.mobileStatusProfile.textContent = model.name;
    elements.mobileStatusUnits.textContent = `自由選択 ${electiveCredits}単位`;

    const errorCount = messages && messages.errors ? messages.errors.length : 0;
    const warningCount = messages && messages.warnings ? messages.warnings.length : 0;

    if (errorCount > 0) {
      elements.mobileStatusAlert.textContent = `エラー ${errorCount}`;
      elements.mobileStatusAlert.className = "mobile-status__alert is-error";
    } else if (warningCount > 0) {
      elements.mobileStatusAlert.textContent = `注意 ${warningCount}`;
      elements.mobileStatusAlert.className = "mobile-status__alert is-warning";
    } else {
      elements.mobileStatusAlert.textContent = "OK";
      elements.mobileStatusAlert.className = "mobile-status__alert is-ok";
    }
  }

  function renderMessages(errors, warnings, infos) {
    renderMessageList(elements.errors, errors, "現在、エラーはありません。");
    renderMessageList(elements.warnings, warnings, "現在、特別な注意事項はありません。");
    renderMessageList(elements.infos, infos, "現在、補足情報はありません。");
  }

  function renderMessageList(container, messages, emptyText) {
    if (!messages || messages.length === 0) {
      container.className = "message-list empty-state";
      container.textContent = emptyText;
      return;
    }

    container.className = "message-list";
    container.innerHTML = `
      <ul>
        ${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join("")}
      </ul>
    `;
  }

  function renderPrintPreview(selectedIds = [], messages = null, electiveCredits = null, totalCredits = null) {
    const model = getCurrentModel();

    if (!model) {
      elements.printPreview.className = "print-preview empty-state";
      elements.printPreview.textContent = "志望型を選択すると、印刷用の確認内容が表示されます。";
      return;
    }

    const errors = messages ? messages.errors : [];
    const warnings = messages ? messages.warnings : [];
    const infos = messages ? messages.infos : [];
    const elective = electiveCredits !== null ? electiveCredits : sumCredits(selectedIds);
    const total = totalCredits !== null ? totalCredits : CONFIG.requiredCredits + elective;

    elements.printPreview.className = "print-preview";
    elements.printPreview.innerHTML = `
      <h3>科目選択 確認シート</h3>
      <dl>
        <dt>志望型</dt>
        <dd>${escapeHtml(model.name)}</dd>
        <dt>必修科目</dt>
        <dd>${CONFIG.requiredCredits}単位</dd>
        <dt>自由選択科目</dt>
        <dd>${elective}単位</dd>
        <dt>合計</dt>
        <dd>${total}単位</dd>
      </dl>

      <h4>必修科目</h4>
      ${renderSimpleRequiredCourseList()}

      <h4>自由選択科目</h4>
      ${renderSimpleCourseList(selectedIds)}

      <h4>確認事項</h4>
      ${renderSimpleMessages([
        ...errors.map((message) => `【エラー】${message}`),
        ...warnings.map((message) => `【注意】${message}`),
        ...infos.map((message) => `【補足】${message}`)
      ])}
    `;
  }


  function renderSimpleRequiredCourseList() {
    if (!REQUIRED_COURSES || REQUIRED_COURSES.length === 0) {
      return `<p>必修科目データが登録されていません。</p>`;
    }

    return `
      <ul>
        ${REQUIRED_COURSES.map((course) => `<li>${escapeHtml(course.name)}（${course.credits}単位／${escapeHtml(course.subject)}）</li>`).join("")}
      </ul>
    `;
  }

  function renderSimpleCourseList(selectedIds) {
    if (!selectedIds.length) {
      return `<p>選択科目はありません。</p>`;
    }

    return `
      <ul>
        ${selectedIds.map((id) => {
          const course = getCourse(id);
          if (!course) return "";

          return `<li>${course.code} ${escapeHtml(course.name)}（${course.credits}単位／${escapeHtml(course.subject)}）</li>`;
        }).join("")}
      </ul>
    `;
  }

  function renderSimpleMessages(messages) {
    if (!messages.length) {
      return `<p>現在、特別な確認事項はありません。</p>`;
    }

    return `
      <ul>
        ${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join("")}
      </ul>
    `;
  }

  function resetSelection() {
    state.profileId = null;
    state.groupSelections = {};
    state.recommendedSelected = new Set();

    renderProfiles();
    renderAll();

    const top = document.getElementById("profile-title");
    if (top) {
      top.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function attachGlobalEvents() {
    if (elements.printButton) {
      elements.printButton.addEventListener("click", () => {
        window.print();
      });
    }

    if (elements.resetButton) {
      elements.resetButton.addEventListener("click", resetSelection);
    }
  }

  function init() {
    renderGlobalNotes();
    renderProfiles();
    renderAll();
    attachGlobalEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
