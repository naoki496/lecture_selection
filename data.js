/**
 * data.js
 * 3年次 科目選択ナビ用データ v5
 */

const CONFIG = {
  "schoolName": "東京都立八王子東高等学校",
  "cohort": "50期生",
  "grade": "第3学年",
  "yearLabel": "令和9年度 3年生用",
  "requiredCredits": 10,
  "electiveMinCredits": 17,
  "electiveMaxCredits": 23,
  "totalMinCredits": 27,
  "totalMaxCredits": 33,
  "graduationCredits": 83,
  "notes": [
    "3年次は必修10単位に加えて、自由選択科目17〜23単位を選択する。",
    "合計27〜33単位となるように構成する。",
    "卒業には3年間で83単位が必要である。",
    "選択した科目は卒業認定の基準となり、年度途中で履修放棄することはできない。",
    "欠時数オーバー等で未履修科目が1つでもあると卒業条件を満たさない。"
  ]
};

const REQUIRED_COURSES = [
  {
    "id": "logical_japanese",
    "subject": "国語",
    "name": "論理国語",
    "credits": 3,
    "type": "必修科目",
    "note": "3年次必修科目。"
  },
  {
    "id": "physical_education_required",
    "subject": "保健体育",
    "name": "体育",
    "credits": 2,
    "type": "必修科目",
    "note": "3年次必修科目。"
  },
  {
    "id": "english_communication_iii",
    "subject": "英語",
    "name": "英語コミュニケーションⅢ",
    "credits": 3,
    "type": "必修科目",
    "note": "3年次必修科目。"
  },
  {
    "id": "logic_expression_iii",
    "subject": "英語",
    "name": "論理・表現Ⅲ",
    "credits": 2,
    "type": "必修科目",
    "note": "3年次必修科目。"
  }
];

const SCHEDULES = [
  {
    "id": "briefing",
    "date": "6月3日（水）",
    "title": "選択説明会",
    "description": "選択科目説明、履修モデルパターン説明、しおり・第1回予備調査票配布。"
  },
  {
    "id": "parents_meeting_1",
    "date": "6月6日（土）",
    "title": "保護者会",
    "description": "選択科目説明、2学年進路部より。"
  },
  {
    "id": "survey_1",
    "date": "7月13日（月）",
    "title": "第1回予備調査票 提出〆切",
    "description": "第1回予備調査票の提出期限。"
  },
  {
    "id": "survey_2_distribution",
    "date": "9月9日（水）",
    "title": "第2回予備調査票 配布予定",
    "description": "第2回予備調査票の配布予定。"
  },
  {
    "id": "survey_2",
    "date": "10月7日（水）",
    "title": "第2回予備調査票 提出〆切",
    "description": "第2回予備調査票の提出期限。"
  },
  {
    "id": "final_survey_distribution",
    "date": "11月4日（水）",
    "title": "本調査票 配布予定",
    "description": "本調査票の配布予定。"
  },
  {
    "id": "final_survey",
    "date": "11月25日（水）",
    "title": "本調査票 最終提出〆切",
    "description": "最終提出期限。11月26日以降、および1月以降の最終確認時の変更は一切受け付けられない。",
    "strict": true
  }
];

const PROFILES = [
  {
    "id": "science_tokyo_kyoto",
    "name": "理系：東大・京大志望",
    "shortName": "理系東大・京大型",
    "description": "理系で、二次試験に古典が必要となる最難関国公立型。",
    "category": "理系"
  },
  {
    "id": "science_national",
    "name": "理系：東大・京大以外の国公立志望",
    "shortName": "国公立理系型",
    "description": "数Ⅲ・理科を中心に選択する。古典は共通テストのみを想定し、自学・講習・質問で対応する型。",
    "category": "理系"
  },
  {
    "id": "science_private",
    "name": "理系：私立理系・薬・栄養系など",
    "shortName": "私立理系型",
    "description": "志望校・学部により数Ⅲや理科の必要性が分かれる理系型。",
    "category": "理系",
    "notice": "補助モデル：PDF掲載の正式モデルではありません。入試科目確認と教員相談が必要です。",
    "isSupplemental": true
  },
  {
    "id": "humanities_tokyo",
    "name": "文系：東大型",
    "shortName": "文系東大型",
    "description": "文系最難関型。古典・数学・地歴の高負荷選択が必要。",
    "category": "文系"
  },
  {
    "id": "humanities_kyoto_hitotsubashi",
    "name": "文系：京大・一橋・旧帝大など難関国公立型",
    "shortName": "文系難関国公立型",
    "description": "二次試験の記述対策を重視する文系難関国公立型。",
    "category": "文系"
  },
  {
    "id": "humanities_national",
    "name": "文系：国公立文系型",
    "shortName": "国公立文系型",
    "description": "共通テストと国公立二次に対応する標準的な文系型。",
    "category": "文系"
  },
  {
    "id": "nursing",
    "name": "看護系志望",
    "shortName": "看護系型",
    "description": "看護系国語、数学演習δ、理科選択に注意する型。",
    "category": "看護"
  },
  {
    "id": "private_humanities",
    "name": "私立文系中心",
    "shortName": "私立文系型",
    "description": "私大入試科目を中心に選択する型。受験方式の確認が特に重要。",
    "category": "文系"
  }
];

const COURSES = [
  {
    "id": "kobun_alpha",
    "code": 11,
    "subject": "国語",
    "name": "古典演習α",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "文系志望で国公立二次試験・難関私立大試験で古典が入試科目にある生徒。",
    "description": "教科書教材を扱いながら、文法力・語彙力・読解力の完成を目指す。適宜、大学入試問題演習も行う。",
    "notes": [
      "古典演習βとは同時選択不可。",
      "第一志望校の二次試験の古典難易度を見て、αかβを判断する。"
    ],
    "consultRequired": false,
    "level": "標準〜難関"
  },
  {
    "id": "kobun_beta",
    "code": 12,
    "subject": "国語",
    "name": "古典演習β",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "難関国公立二次試験・難関私立大試験で古典が入試科目にある生徒。",
    "description": "記述問題に対応できる力の育成を目指す。教科書教材に加え、積極的に大学入試問題演習を取り入れる。",
    "notes": [
      "文系の東大・京大・一橋大受験予定者に推奨。",
      "受講に際し、必ず事前に国語科教諭に相談すること。",
      "古典成績に条件あり。"
    ],
    "consultRequired": true,
    "level": "難関"
  },
  {
    "id": "kobun_gamma",
    "code": 13,
    "subject": "国語",
    "name": "古典演習γ",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "理系"
    ],
    "target": "理系志望で、難関国公立二次試験で古典が入試科目にある生徒。",
    "description": "記述問題に対応できる力の育成を目指す。教科書教材に加え、積極的に大学入試問題演習を取り入れる。",
    "notes": [
      "理系の東大・京大受験予定者向け。",
      "国公立理系で東大・京大以外を志望する場合は、原則として選択対象外。",
      "受講に際し、必ず事前に国語科教諭に相談すること。"
    ],
    "consultRequired": true,
    "level": "難関"
  },
  {
    "id": "nursing_japanese",
    "code": 14,
    "subject": "国語",
    "name": "看護系国語",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "理系",
      "看護"
    ],
    "target": "大学看護学部進学希望の生徒。",
    "description": "医療や看護をとりまく問題、医療従事者としての姿勢について、様々な教材を通じて学ぶ。",
    "notes": [
      "看護師を強く志望する生徒のみが受講できる。",
      "医学部・薬学部志望の生徒は対象外。",
      "小論文指導は共通テスト後、希望者に個別で国語科として行う。"
    ],
    "consultRequired": false,
    "level": "看護系"
  },
  {
    "id": "geo_alpha",
    "code": 21,
    "subject": "地歴",
    "name": "地理探究α",
    "credits": 3,
    "type": "地理探究",
    "track": [
      "文系",
      "文理"
    ],
    "target": "主に共通テストで『地理総合、地理探究』を受験予定の生徒。",
    "description": "地理総合を基礎とし、地理的事象の系統的理解と地域性の把握を通して、共通テストに対応できる力を身につける。",
    "notes": [
      "地理探究βとは同時選択不可。",
      "共通テストで地理を必要としない生徒が教養として履修することも可能。"
    ],
    "consultRequired": false,
    "level": "共通テスト中心"
  },
  {
    "id": "geo_beta",
    "code": 22,
    "subject": "地歴",
    "name": "地理探究β",
    "credits": 4,
    "type": "地理探究",
    "track": [
      "文系"
    ],
    "target": "『地理総合、地理探究』で受験予定の生徒。",
    "description": "地理的見方・考え方を深化させ、大学入試に対応できる力を身につける。",
    "notes": [
      "地理探究αとは同時選択不可。",
      "国公立二次・私大・共通テストに対応。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "world_history_a",
    "code": 23,
    "subject": "地歴",
    "name": "世界史探究演習a",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "『歴史総合、世界史探究』で受験予定の生徒。",
    "description": "世界史探究演習bとともに、2年次未習部分、近代から現代までの範囲を通史として扱う。",
    "notes": [
      "原則として世界史探究演習bとセット。",
      "世界史探究演習b単独では選択不可。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "world_history_b",
    "code": 24,
    "subject": "地歴",
    "name": "世界史探究演習b",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "『歴史総合、世界史探究』で受験予定の生徒。",
    "description": "世界史探究演習aとともに2年次未習部分、特にアジア史を中心に扱う。全範囲終了後は問題演習形式に移行する。",
    "notes": [
      "世界史探究演習aとセット。",
      "単独選択不可。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "japanese_history_a",
    "code": 25,
    "subject": "地歴",
    "name": "日本史探究演習a",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "『歴史総合、日本史探究』で受験予定の生徒。",
    "description": "日本史探究演習bと連携しながら、2年次未習部分の近世史・近代史の授業を進める。",
    "notes": [
      "原則として日本史探究演習bとセット。",
      "史・資料を活用し、共通テスト・国公立二次・私大入試に対応できる力を養う。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "japanese_history_b",
    "code": 26,
    "subject": "地歴",
    "name": "日本史探究演習b",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "『歴史総合、日本史探究』で受験予定の生徒。",
    "description": "日本史探究演習aと連携しながら、近世史・現代史を扱う。",
    "notes": [
      "日本史探究演習aとセット。",
      "単独選択不可。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "public_studies",
    "code": 27,
    "subject": "公民",
    "name": "公共演習",
    "credits": 1,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "主に共通テストで『公共、政治・経済』または『公共、倫理』を受験予定の生徒。",
    "description": "公共の内容を基礎として、共通テストに対応する考察力を身につける。",
    "notes": [
      "倫理または政治・経済とセットでのみ選択可能。",
      "単独選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "ethics",
    "code": 28,
    "subject": "公民",
    "name": "倫理",
    "credits": 2,
    "type": "倫理",
    "track": [
      "文系",
      "理系"
    ],
    "target": "主に共通テストで『公共、倫理』を受験予定の生徒。",
    "description": "公共で学習した倫理分野の内容を発展的に学習する。",
    "notes": [
      "公共演習とセット。",
      "理系生徒が公共＋倫理で受験する場合、倫理は自学扱いになる点に注意。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "politics_economics",
    "code": 29,
    "subject": "公民",
    "name": "政治・経済",
    "credits": 2,
    "type": "政治・経済",
    "track": [
      "文系",
      "理系"
    ],
    "target": "主に共通テストで『公共、政治・経済』を受験予定の生徒。",
    "description": "公共で学習した政治・経済分野の内容を発展的に学習する。私大政経入試にも対応する。",
    "notes": [
      "公共演習とセット。"
    ],
    "consultRequired": false,
    "level": "共通テスト・私大対応"
  },
  {
    "id": "math_ia",
    "code": 31,
    "subject": "数学",
    "name": "数学ⅠA演習",
    "credits": 3,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "共通テストを『数学Ⅰ・A』のみで受験する文系生徒。",
    "description": "共通テストで数学Ⅰ・Aを解くための基礎力と応用力を養う。",
    "notes": [
      "数学演習α・数学演習βとは同時選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "math_alpha",
    "code": 32,
    "subject": "数学",
    "name": "数学演習α",
    "credits": 3,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "共通テストを『数学Ⅰ・A』『数学Ⅱ・B・C』で受験し、主に数学の二次試験がない文系生徒。",
    "description": "共通テストで数学ⅠA・ⅡBCを解くための基礎力と応用力を養う。",
    "notes": [
      "数学ⅠA演習・数学演習βとは同時選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "math_beta",
    "code": 33,
    "subject": "数学",
    "name": "数学演習β",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "文系国公立難関大学の二次試験で数学を課される生徒。",
    "description": "数学Ⅰ・A・Ⅱ・B・Cの範囲で、難関国公立大学の二次試験を想定した問題演習を行う。",
    "notes": [
      "東大・京大・一橋を第一志望としている生徒は必ず履修。",
      "1・2年次の成績を踏まえ、覚悟をもって履修する。",
      "原則として、事前に数学科教諭との面談を行う。"
    ],
    "consultRequired": true,
    "level": "難関"
  },
  {
    "id": "math_gamma",
    "code": 34,
    "subject": "数学",
    "name": "数学演習γ",
    "credits": 3,
    "type": "学校設定科目",
    "track": [
      "理系"
    ],
    "target": "理系大学の二次試験で記述形式の数学を課される生徒。",
    "description": "数学Ⅰ・A・Ⅱ・Bの範囲の大学入試問題を扱う。問題解法演習が中心。",
    "notes": [
      "理系大学への進学希望者は、数学Ⅲと数学演習γを合わせて選択する。",
      "数学Ⅲとセット。"
    ],
    "consultRequired": false,
    "level": "理系"
  },
  {
    "id": "math_delta",
    "code": 35,
    "subject": "数学",
    "name": "数学演習δ",
    "credits": 3,
    "type": "学校設定科目",
    "track": [
      "理系",
      "看護"
    ],
    "target": "理系選択で共通テストのみ数学が必要な生徒。数Ⅲを使わない理系生徒。",
    "description": "共通テストで数学ⅠA・ⅡBCを解くための基礎力と応用力を養う。",
    "notes": [
      "看護系・栄養系・私立薬などを想定。",
      "数学Ⅲ・数学演習γとは同時選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "math_iii",
    "code": 36,
    "subject": "数学",
    "name": "数学Ⅲ",
    "credits": 5,
    "type": "数学Ⅲ",
    "track": [
      "理系"
    ],
    "target": "理系大学進学を希望する生徒。",
    "description": "微分法・積分法を一般の関数に拡張し、無限の概念などを学ぶ。後半は大学入試問題演習を行う。",
    "notes": [
      "数学演習γとセットで選択する。",
      "進路変更で数学Ⅲが不要になると負担が大きいため、強い意志を持って履修すること。"
    ],
    "consultRequired": false,
    "level": "理系"
  },
  {
    "id": "physics",
    "code": 41,
    "subject": "理科",
    "name": "物理",
    "credits": 6,
    "type": "物理",
    "track": [
      "理系",
      "看護"
    ],
    "target": "理系大学進学希望者で、受験科目に物理が必要な生徒。",
    "description": "講義と実験によって学習し、物理現象の概念・法則の理解を深める。",
    "notes": [
      "生物とは同時選択不可。",
      "授業時間内だけでは演習が十分ではないため、各自での演習が必要。"
    ],
    "consultRequired": false,
    "level": "理系"
  },
  {
    "id": "advanced_chemistry",
    "code": 42,
    "subject": "理科",
    "name": "発展化学",
    "credits": 4,
    "type": "学校設定科目",
    "track": [
      "理系",
      "看護"
    ],
    "target": "理系大学進学希望者で、受験科目に化学が必要な生徒。",
    "description": "実験を中心に授業を行う。12月末までに10回前後の実験を予定。",
    "notes": [
      "実験レポートは必ず提出する必要がある。",
      "授業外演習も必要。"
    ],
    "consultRequired": false,
    "level": "理系"
  },
  {
    "id": "biology",
    "code": 43,
    "subject": "理科",
    "name": "生物",
    "credits": 6,
    "type": "生物",
    "track": [
      "理系",
      "看護"
    ],
    "target": "理系大学進学希望者で、受験科目に生物が必要な生徒。",
    "description": "現代生物学の最新の成果に接し、生物を本質的に深く探究する。",
    "notes": [
      "物理とは同時選択不可。",
      "1年次の生物基礎の理解の上に学習する。"
    ],
    "consultRequired": false,
    "level": "理系"
  },
  {
    "id": "basic_physics",
    "code": 44,
    "subject": "理科",
    "name": "物理基礎演習",
    "credits": 1,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "物理を選択しない生徒で、共通テストを物理基礎で受験する生徒。",
    "description": "基礎的な法則を理解した後、総合問題演習を行い、実力を養成する。",
    "notes": [
      "理科基礎演習は3科目から2科目セットで選択。",
      "1科目のみの選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "basic_chemistry",
    "code": 45,
    "subject": "理科",
    "name": "化学基礎演習",
    "credits": 1,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "化学を選択しない生徒で、共通テストを化学基礎で受験する生徒。",
    "description": "1年次の内容を、共通テストやセンター試験の過去問などを利用して復習・演習する。",
    "notes": [
      "理科基礎演習は3科目から2科目セットで選択。",
      "1科目のみの選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "basic_biology",
    "code": 46,
    "subject": "理科",
    "name": "生物基礎演習",
    "credits": 1,
    "type": "学校設定科目",
    "track": [
      "文系"
    ],
    "target": "生物を選択しない生徒で、共通テストを生物基礎で受験する生徒。",
    "description": "生物基礎について、内容の定着と問題演習を中心に授業を行う。",
    "notes": [
      "理科基礎演習は3科目から2科目セットで選択。",
      "1科目のみの選択不可。"
    ],
    "consultRequired": false,
    "level": "共通テスト"
  },
  {
    "id": "pe",
    "code": 51,
    "subject": "体育",
    "name": "選択体育",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "体育の実技に関して、安全にかつ積極的に取り組むことができる生徒。",
    "description": "球技を中心に取り組み、体力の向上や心身の育成を目指す。",
    "notes": [
      "選択体育・選択音楽・選択美術・選択書道はいずれか1科目のみ選択可能。"
    ],
    "consultRequired": false,
    "level": "教養"
  },
  {
    "id": "music",
    "code": 61,
    "subject": "芸術",
    "name": "選択音楽",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "基礎と教養を重視した音楽講座を受講したい生徒。",
    "description": "読譜力、鑑賞方法、歌唱、器楽演奏、創作を中心に展開する。",
    "notes": [
      "1年次の芸術選択に関わらず受講可能。",
      "選択体育・選択音楽・選択美術・選択書道はいずれか1科目のみ選択可能。"
    ],
    "consultRequired": false,
    "level": "教養"
  },
  {
    "id": "art",
    "code": 62,
    "subject": "芸術",
    "name": "選択美術",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "教養を深めるために美術を学びたい生徒。",
    "description": "制作活動を中心に行い、技法や基礎理論を理解し、創造的な表現に取り組む。",
    "notes": [
      "1年次の芸術選択に関わらず受講可能。",
      "選択体育・選択音楽・選択美術・選択書道はいずれか1科目のみ選択可能。"
    ],
    "consultRequired": false,
    "level": "教養"
  },
  {
    "id": "calligraphy",
    "code": 63,
    "subject": "芸術",
    "name": "選択書道",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "教養を深めるために書道を学びたい生徒。",
    "description": "各種の書体を学習し、自分の表現を成長させる学習活動に取り組む。",
    "notes": [
      "1年次の芸術選択に関わらず受講可能。",
      "選択体育・選択音楽・選択美術・選択書道はいずれか1科目のみ選択可能。"
    ],
    "consultRequired": false,
    "level": "教養"
  },
  {
    "id": "english_reading",
    "code": 71,
    "subject": "英語",
    "name": "英語演習",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理"
    ],
    "target": "国公立大学の個別試験・私大入試で長文読解力を必要とする生徒。",
    "description": "英語長文の読解を中心とし、2年生までの成績をもとに習熟度別に2クラスで展開予定。",
    "notes": [
      "数学Ⅲとは同時選択不可。",
      "Aクラスは最難関国公立大・英語難関国公立・早慶上智レベル、Bクラスはその他国公立大・私立大レベル。"
    ],
    "consultRequired": false,
    "level": "大学入試対応"
  },
  {
    "id": "english_inquiry",
    "code": 72,
    "subject": "英語",
    "name": "英語探究演習",
    "credits": 2,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理"
    ],
    "target": "国公立大学の個別試験・私大入試でリスニングや会話の試験を課す大学を受験する者。",
    "description": "リスニング・スピーキング活動を中心に、英語4技能の伸長を目指す。",
    "notes": [
      "東京外大などの英語難関大志望者、外部試験利用者に推奨。",
      "数学演習βとは同時選択不可。"
    ],
    "consultRequired": false,
    "level": "英語4技能"
  },
  {
    "id": "inquiry",
    "code": 99,
    "subject": "探究",
    "name": "課題探究演習",
    "credits": 1,
    "type": "学校設定科目",
    "track": [
      "文系",
      "文理",
      "理系"
    ],
    "target": "国公立・私立の推薦型選抜・総合型選抜を利用する者のうち、特に高度な取り組みを必要とする者。",
    "description": "2年次までの探究活動を発展させ、推薦型選抜や総合型選抜に活用できるレベルに高める。",
    "notes": [
      "履修の目的と課題意識が必要。",
      "大学入学後について明確な構想を描いている人のみ受講を認める。",
      "事前に探究部の担当教員に相談すること。",
      "古典演習γとは同時選択不可。"
    ],
    "consultRequired": true,
    "level": "推薦・総合型"
  }
];

const COURSE_SETS = [
  {
    "id": "math3_math_gamma",
    "name": "数学Ⅲ＋数学演習γ",
    "courseIds": [
      "math_iii",
      "math_gamma"
    ],
    "type": "required_pair",
    "message": "数学Ⅲと数学演習γはセットで選択する。"
  },
  {
    "id": "world_history_full",
    "name": "世界史探究演習a＋b",
    "courseIds": [
      "world_history_a",
      "world_history_b"
    ],
    "type": "required_pair",
    "message": "世界史探究演習aとbは原則セットで選択する。"
  },
  {
    "id": "japanese_history_full",
    "name": "日本史探究演習a＋b",
    "courseIds": [
      "japanese_history_a",
      "japanese_history_b"
    ],
    "type": "required_pair",
    "message": "日本史探究演習aとbは原則セットで選択する。"
  },
  {
    "id": "public_ethics",
    "name": "公共演習＋倫理",
    "courseIds": [
      "public_studies",
      "ethics"
    ],
    "type": "public_pair",
    "message": "公共演習と倫理はセットで選択する。"
  },
  {
    "id": "public_politics",
    "name": "公共演習＋政治・経済",
    "courseIds": [
      "public_studies",
      "politics_economics"
    ],
    "type": "public_pair",
    "message": "公共演習と政治・経済はセットで選択する。"
  },
  {
    "id": "science_basics_two",
    "name": "理科基礎演習2科目セット",
    "courseIds": [
      "basic_physics",
      "basic_chemistry",
      "basic_biology"
    ],
    "type": "choose_exactly",
    "requiredCount": 2,
    "message": "物理基礎演習・化学基礎演習・生物基礎演習から必ず2科目を選択する。"
  },
  {
    "id": "history_exception_world6_japan4",
    "name": "歴史2科目特例：世界史6単位＋日本史4単位",
    "courseIds": [
      "world_history_a",
      "world_history_b",
      "japanese_history_a"
    ],
    "type": "exception",
    "message": "世界史6単位＋日本史4単位の特例。日本史b相当部分は講習または自学で対応する。"
  }
];

const EXCLUSIVE_GROUPS = [
  {
    "id": "kobun_alpha_beta",
    "name": "古典演習α／古典演習β",
    "courseIds": [
      "kobun_alpha",
      "kobun_beta"
    ],
    "max": 1,
    "severity": "error",
    "message": "古典演習αと古典演習βは同時選択できない。"
  },
  {
    "id": "geography_alpha_beta",
    "name": "地理探究α／地理探究β",
    "courseIds": [
      "geo_alpha",
      "geo_beta"
    ],
    "max": 1,
    "severity": "error",
    "message": "地理探究αと地理探究βは同時選択できない。"
  },
  {
    "id": "math_humanities",
    "name": "数学ⅠA演習／数学演習α／数学演習β",
    "courseIds": [
      "math_ia",
      "math_alpha",
      "math_beta"
    ],
    "max": 1,
    "severity": "error",
    "message": "数学ⅠA演習・数学演習α・数学演習βはいずれか1つのみ選択できる。"
  },
  {
    "id": "math_gamma_delta",
    "name": "数学演習γ／数学演習δ",
    "courseIds": [
      "math_gamma",
      "math_delta"
    ],
    "max": 1,
    "severity": "error",
    "message": "数学演習γと数学演習δは同時選択できない。"
  },
  {
    "id": "math3_delta",
    "name": "数学Ⅲ／数学演習δ",
    "courseIds": [
      "math_iii",
      "math_delta"
    ],
    "max": 1,
    "severity": "error",
    "message": "数学Ⅲと数学演習δは同時選択できない。"
  },
  {
    "id": "physics_biology",
    "name": "物理／生物",
    "courseIds": [
      "physics",
      "biology"
    ],
    "max": 1,
    "severity": "error",
    "message": "物理と生物は同時選択できない。"
  },
  {
    "id": "math3_english_reading",
    "name": "数学Ⅲ／英語演習",
    "courseIds": [
      "math_iii",
      "english_reading"
    ],
    "max": 1,
    "severity": "error",
    "message": "数学Ⅲと英語演習は同時選択できない。"
  },
  {
    "id": "pe_arts",
    "name": "選択体育／選択音楽／選択美術／選択書道",
    "courseIds": [
      "pe",
      "music",
      "art",
      "calligraphy"
    ],
    "max": 1,
    "severity": "error",
    "message": "選択体育・選択音楽・選択美術・選択書道はいずれか1科目のみ選択できる。"
  },
  {
    "id": "inquiry_kobun_gamma",
    "name": "課題探究演習／古典演習γ",
    "courseIds": [
      "inquiry",
      "kobun_gamma"
    ],
    "max": 1,
    "severity": "error",
    "message": "課題探究演習と古典演習γは同時選択できない。"
  },
  {
    "id": "english_inquiry_math_beta",
    "name": "英語探究演習／数学演習β",
    "courseIds": [
      "english_inquiry",
      "math_beta"
    ],
    "max": 1,
    "severity": "error",
    "message": "英語探究演習と数学演習βは同時選択できない。"
  }
];

const MODELS = {
  "science_tokyo_kyoto": {
    "profileId": "science_tokyo_kyoto",
    "name": "理系：東大・京大志望",
    "required": [
      "math_iii",
      "math_gamma",
      "advanced_chemistry"
    ],
    "recommended": [
      "kobun_gamma"
    ],
    "selectableGroups": [
      {
        "id": "science_main",
        "label": "理科発展科目",
        "type": "single",
        "required": true,
        "options": [
          "physics",
          "biology"
        ],
        "note": "物理または生物を選択する。"
      },
      {
        "id": "civics",
        "label": "共通テスト地歴公民",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "地理探究α",
            "courseIds": [
              "geo_alpha"
            ]
          },
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          }
        ],
        "note": "公共＋倫理で受験する場合、倫理は自学対応です。"
      }
    ],
    "lockedOut": [
      "kobun_alpha",
      "kobun_beta",
      "math_delta",
      "english_reading"
    ],
    "warnings": [
      "古典演習γは理系の東大・京大志望者向け。受講前に国語科へ相談すること。",
      "数学Ⅲ・数学演習γは理系大学進学希望者向けの中核科目であり、進路変更時の負担が大きい。"
    ],
    "selfStudy": [
      "理系で公共＋倫理を選ぶ場合、倫理は自学対応となる。"
    ]
  },
  "science_national": {
    "profileId": "science_national",
    "name": "理系：東大・京大以外の国公立志望",
    "required": [
      "math_iii",
      "math_gamma",
      "advanced_chemistry"
    ],
    "recommended": [],
    "selectableGroups": [
      {
        "id": "science_main",
        "label": "理科発展科目",
        "type": "single",
        "required": true,
        "options": [
          "physics",
          "biology"
        ],
        "note": "物理または生物を選択する。"
      },
      {
        "id": "civics",
        "label": "共通テスト地歴公民",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "地理探究α",
            "courseIds": [
              "geo_alpha"
            ]
          },
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          }
        ],
        "note": "公共＋倫理で受験する場合、倫理は自学対応です。"
      }
    ],
    "lockedOut": [
      "kobun_alpha",
      "kobun_beta",
      "kobun_gamma",
      "math_delta",
      "english_reading"
    ],
    "warnings": [
      "東大・京大以外の国公立理系志望者は、古典演習α・β・γを選択対象外とする。",
      "古典は共通テストのみを想定し、自学・講習・質問で対応する。",
      "古典は2学年終了時までに共通テスト水準を完成させる必要がある。"
    ],
    "selfStudy": [
      "共通テスト古典",
      "公共＋倫理を選ぶ場合の倫理"
    ]
  },
  "science_private": {
    "profileId": "science_private",
    "name": "理系：私立理系・薬・栄養系など",
    "required": [],
    "recommended": [
      "advanced_chemistry"
    ],
    "selectableGroups": [
      {
        "id": "math_route",
        "label": "数学ルート",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "数Ⅲあり：数学Ⅲ＋数学演習γ",
            "courseIds": [
              "math_iii",
              "math_gamma"
            ]
          },
          {
            "label": "数Ⅲなし：数学演習δ",
            "courseIds": [
              "math_delta"
            ]
          }
        ],
        "note": "志望校・学部の入試科目を必ず確認する。"
      },
      {
        "id": "science_main",
        "label": "理科発展科目",
        "type": "single",
        "required": true,
        "options": [
          "physics",
          "biology"
        ]
      }
    ],
    "lockedOut": [
      "kobun_alpha",
      "kobun_beta",
      "kobun_gamma"
    ],
    "warnings": [
      "私立理系は学部・方式により数Ⅲや理科の必要性が大きく異なるため、必ず募集要項を確認する。",
      "この型はPDF掲載の正式履修モデルではない補助モデルです。志望校の入試科目を確認し、必ず担任・教科担当に相談してください。"
    ],
    "selfStudy": []
  },
  "humanities_tokyo": {
    "profileId": "humanities_tokyo",
    "name": "文系：東大型",
    "required": [
      "kobun_beta",
      "math_beta"
    ],
    "recommended": [
      "english_reading"
    ],
    "selectableGroups": [
      {
        "id": "history_route",
        "label": "東大文系の地歴2科目受験に対応する組み合わせ",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "世界史6単位＋日本史4単位",
            "courseIds": [
              "world_history_a",
              "world_history_b",
              "japanese_history_a"
            ]
          },
          {
            "label": "世界史6単位＋地理探究β",
            "courseIds": [
              "world_history_a",
              "world_history_b",
              "geo_beta"
            ]
          },
          {
            "label": "日本史6単位＋地理探究β",
            "courseIds": [
              "japanese_history_a",
              "japanese_history_b",
              "geo_beta"
            ]
          }
        ],
        "note": "東大文系では地歴2科目受験を前提に組み合わせを確認してください。世界史6単位＋日本史4単位の場合、日本史探究b相当範囲は講習または自学で対応します。"
      },
      {
        "id": "science_basics",
        "label": "理科基礎演習",
        "type": "choose_exactly",
        "required": true,
        "count": 2,
        "options": [
          "basic_physics",
          "basic_chemistry",
          "basic_biology"
        ]
      }
    ],
    "lockedOut": [
      "kobun_alpha",
      "math_ia",
      "math_alpha",
      "math_iii",
      "math_gamma",
      "math_delta",
      "english_inquiry"
    ],
    "warnings": [
      "古典演習βと数学演習βは事前相談・面談が必要。",
      "歴史2科目受験では、自学範囲が発生する可能性がある。",
      "東大文系の地歴は2科目受験を前提に組み合わせを確認してください。日本史6単位＋世界史4単位のパターンは設定しません。"
    ],
    "selfStudy": [
      "世界史＋日本史の2科目受験時、受講できない探究演習b相当範囲。"
    ]
  },
  "humanities_kyoto_hitotsubashi": {
    "profileId": "humanities_kyoto_hitotsubashi",
    "name": "文系：京大・一橋・旧帝大など難関国公立型",
    "required": [],
    "recommended": [
      "english_reading"
    ],
    "selectableGroups": [
      {
        "id": "kobun_level",
        "label": "古典演習",
        "type": "single",
        "required": true,
        "options": [
          "kobun_alpha",
          "kobun_beta"
        ],
        "note": "第一志望校の二次古典の難易度に応じてαまたはβを選択する。"
      },
      {
        "id": "math_route",
        "label": "数学選択",
        "type": "single",
        "required": true,
        "options": [
          "math_beta",
          "math_alpha"
        ],
        "note": "数学演習β：二次試験で数学を使う場合。数学演習α：数学が共通テストのみの場合。"
      },
      {
        "id": "history_route",
        "label": "地歴選択",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "世界史6単位",
            "courseIds": [
              "world_history_a",
              "world_history_b"
            ]
          },
          {
            "label": "日本史6単位",
            "courseIds": [
              "japanese_history_a",
              "japanese_history_b"
            ]
          },
          {
            "label": "地理探究β",
            "courseIds": [
              "geo_beta"
            ]
          },
          {
            "label": "地理探究α",
            "courseIds": [
              "geo_alpha"
            ]
          }
        ]
      },
      {
        "id": "civics",
        "label": "共通テスト公民",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          },
          {
            "label": "公共演習＋倫理",
            "courseIds": [
              "public_studies",
              "ethics"
            ]
          }
        ]
      },
      {
        "id": "science_basics",
        "label": "理科基礎演習",
        "type": "choose_exactly",
        "required": true,
        "count": 2,
        "options": [
          "basic_physics",
          "basic_chemistry",
          "basic_biology"
        ]
      }
    ],
    "lockedOut": [
      "math_ia",
      "math_iii",
      "math_gamma",
      "math_delta"
    ],
    "warnings": [
      "数学演習βは事前に数学科教諭との面談が必要。",
      "古典演習βを選ぶ場合は事前に国語科教諭へ相談する。"
    ],
    "selfStudy": []
  },
  "humanities_national": {
    "profileId": "humanities_national",
    "name": "文系：国公立文系型",
    "required": [
      "kobun_alpha"
    ],
    "recommended": [
      "math_alpha",
      "english_reading"
    ],
    "selectableGroups": [
      {
        "id": "math_route",
        "label": "数学選択",
        "type": "single",
        "required": true,
        "options": [
          "math_alpha",
          "math_ia"
        ],
        "note": "数学ⅠAのみか、数学ⅠA・ⅡBCまで必要かを志望校で確認する。"
      },
      {
        "id": "history_route",
        "label": "地歴選択",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "世界史6単位",
            "courseIds": [
              "world_history_a",
              "world_history_b"
            ]
          },
          {
            "label": "日本史6単位",
            "courseIds": [
              "japanese_history_a",
              "japanese_history_b"
            ]
          },
          {
            "label": "地理探究β",
            "courseIds": [
              "geo_beta"
            ]
          },
          {
            "label": "地理探究α",
            "courseIds": [
              "geo_alpha"
            ]
          }
        ]
      },
      {
        "id": "civics",
        "label": "共通テスト公民",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          },
          {
            "label": "公共演習＋倫理",
            "courseIds": [
              "public_studies",
              "ethics"
            ]
          }
        ]
      },
      {
        "id": "science_basics",
        "label": "理科基礎演習",
        "type": "choose_exactly",
        "required": true,
        "count": 2,
        "options": [
          "basic_physics",
          "basic_chemistry",
          "basic_biology"
        ]
      }
    ],
    "lockedOut": [
      "kobun_beta",
      "kobun_gamma",
      "math_beta",
      "math_iii",
      "math_gamma",
      "math_delta"
    ],
    "warnings": [
      "数学が共通テストのみの場合は数学演習αが基本。数学ⅠAのみでよい場合は数学ⅠA演習を検討する。"
    ],
    "selfStudy": []
  },
  "nursing": {
    "profileId": "nursing",
    "name": "看護系志望",
    "required": [
      "math_delta",
      "advanced_chemistry"
    ],
    "recommended": [
      "nursing_japanese",
      "english_reading"
    ],
    "selectableGroups": [
      {
        "id": "science_main",
        "label": "理科発展科目",
        "type": "single",
        "required": true,
        "options": [
          "physics",
          "biology"
        ],
        "note": "看護系でも理科は2科目選択を基本とする。"
      },
      {
        "id": "civics",
        "label": "共通テスト地歴公民",
        "type": "single_set",
        "required": false,
        "options": [
          {
            "label": "地理探究α",
            "courseIds": [
              "geo_alpha"
            ]
          },
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          },
          {
            "label": "公共演習＋倫理",
            "courseIds": [
              "public_studies",
              "ethics"
            ]
          }
        ],
        "note": "必要な場合に選択してください。"
      }
    ],
    "lockedOut": [
      "kobun_alpha",
      "kobun_beta",
      "kobun_gamma",
      "math_iii",
      "math_gamma"
    ],
    "warnings": [
      "看護系国語は看護学部志望者のみ対象。医学部・薬学部志望者は対象外。",
      "看護系でも理科は発展化学＋物理または生物の2科目選択を基本とします。"
    ],
    "selfStudy": []
  },
  "private_humanities": {
    "profileId": "private_humanities",
    "name": "私立文系中心",
    "required": [],
    "recommended": [
      "english_reading"
    ],
    "selectableGroups": [
      {
        "id": "kobun_level",
        "label": "古典演習",
        "type": "single",
        "required": false,
        "options": [
          "kobun_alpha",
          "kobun_beta"
        ],
        "note": "難関私大で古典が必要な場合は、古典演習αまたはβを検討する。"
      },
      {
        "id": "history_or_civics",
        "label": "地歴公民",
        "type": "single_set",
        "required": true,
        "options": [
          {
            "label": "世界史6単位",
            "courseIds": [
              "world_history_a",
              "world_history_b"
            ]
          },
          {
            "label": "日本史6単位",
            "courseIds": [
              "japanese_history_a",
              "japanese_history_b"
            ]
          },
          {
            "label": "地理探究β",
            "courseIds": [
              "geo_beta"
            ]
          },
          {
            "label": "公共演習＋政治・経済",
            "courseIds": [
              "public_studies",
              "politics_economics"
            ]
          }
        ]
      }
    ],
    "lockedOut": [
      "kobun_gamma",
      "math_iii",
      "math_gamma",
      "math_delta"
    ],
    "warnings": [
      "私立文系は大学・学部・方式により必要科目が大きく異なるため、募集要項の確認が必須。"
    ],
    "selfStudy": []
  }
};

const RULES = {
  "creditRange": {
    "electiveMin": 17,
    "electiveMax": 23,
    "totalMin": 27,
    "totalMax": 33,
    "errorBelow": "自由選択科目が17単位未満です。",
    "errorAbove": "自由選択科目が23単位を超えています。"
  },
  "blockedByProfile": [
    {
      "id": "science_national_no_kobun",
      "profileIds": [
        "science_national"
      ],
      "blockedCourseIds": [
        "kobun_alpha",
        "kobun_beta",
        "kobun_gamma"
      ],
      "severity": "error",
      "message": "東大・京大以外の国公立理系志望者は、古典演習α・β・γを選択対象外とする。古典は共通テスト対応として自学・講習・質問で進める。"
    },
    {
      "id": "science_private_no_kobun",
      "profileIds": [
        "science_private"
      ],
      "blockedCourseIds": [
        "kobun_alpha",
        "kobun_beta",
        "kobun_gamma"
      ],
      "severity": "warning",
      "message": "私立理系型では通常、古典演習は選択対象外。志望校の入試科目を必ず確認する。"
    },
    {
      "id": "nursing_no_kobun",
      "profileIds": [
        "nursing"
      ],
      "blockedCourseIds": [
        "kobun_alpha",
        "kobun_beta",
        "kobun_gamma"
      ],
      "severity": "error",
      "message": "看護系モデルでは古典演習α・β・γを基本選択対象外とする。"
    }
  ],
  "requiredConsultation": {
    "courseIds": [
      "kobun_beta",
      "kobun_gamma",
      "math_beta",
      "inquiry"
    ],
    "severity": "warning",
    "message": "この科目は受講前に担当教員への事前相談・面談が必要です。"
  },
  "importantWarnings": [
    {
      "id": "chemistry_report",
      "courseIds": [
        "advanced_chemistry"
      ],
      "severity": "info",
      "message": "発展化学は実験レポート提出が必須です。実験参加と授業外演習が必要です。"
    },
    {
      "id": "math3_commitment",
      "courseIds": [
        "math_iii"
      ],
      "severity": "warning",
      "message": "数学Ⅲは5単位で負担が大きい科目です。途中で不要になる進路選択をすると時間的損失が大きいため、理系進学の意思を確認してください。"
    },
    {
      "id": "history_two_subjects_self_study",
      "courseIds": [
        "world_history_a",
        "japanese_history_a"
      ],
      "severity": "warning",
      "message": "世界史探究と日本史探究の2科目受験では、時間割上どちらか一方の探究演習b相当部分が自学となる可能性があります。"
    },
    {
      "id": "science_public_ethics",
      "profileIds": [
        "science_tokyo_kyoto",
        "science_national"
      ],
      "courseIds": [
        "public_studies",
        "ethics"
      ],
      "severity": "warning",
      "message": "理系生徒が公共＋倫理で受験する場合、倫理は自学対応となります。"
    }
  ]
};

if (typeof window !== "undefined") {
  window.COURSE_SELECTOR_DATA = {
    CONFIG,
    REQUIRED_COURSES,
    SCHEDULES,
    PROFILES,
    COURSES,
    COURSE_SETS,
    EXCLUSIVE_GROUPS,
    MODELS,
    RULES
  };
}
