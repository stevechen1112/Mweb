export type FallbackNewsPost = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishedAt: string;
};

export type FallbackBlogPost = {
  id: number;
  category: string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string;
  readTime: number;
  publishedAt: string;
};

export type FallbackCourseModule = {
  title: string;
  desc: string;
};

export type FallbackCourse = {
  slug: string;
  titleEn: string;
  titleZh: string;
  subtitle: string;
  intro: string;
  targets: string[];
  modules: FallbackCourseModule[];
  bannerImage: string;
  listImage: string;
  sortOrder: number;
};

export const fallbackNewsPosts: FallbackNewsPost[] = [
  {
    id: 1,
    title: "KRAV MAGA LEVEL 1 體驗營報名開跑",
    description: "最新梯次的防衛體驗營正式開放報名，名額有限報名從速。我們將帶來最原汁原味的 Krav Maga 技術教學，由擁有國際認證資格的教練親自帶領，確保每位學員在安全、有效的環境中學習。課程包含基礎防衛站姿、距離管理與反應訓練，適合零基礎學員參加。",
    imageUrl: "/assets/1 首頁/news1.png",
    publishedAt: "2024-08-15T00:00:00.000Z",
  },
  {
    id: 2,
    title: "祈滕戰術企業官方網站全新上線",
    description: "為了提供學員更順暢的體驗與更豐富的資訊，祈滕戰術全新官網正式啟用。新版網站整合課程報名、部落格知識平台與裝備商城，歡迎舊學員重新登錄探索，並分享給有需要的朋友。",
    imageUrl: "/assets/1 首頁/news2.png",
    publishedAt: "2024-07-22T00:00:00.000Z",
  },
  {
    id: 3,
    title: "與國外特種部隊教官交流技術",
    description: "本月特別邀請前特種單位教官來台進行五天技術交流，將最新戰術思維引進國內。交流內容涵蓋近身控制、環境判讀與動態決策訓練，祈滕教學系統將融入這些前沿概念，持續提升課程品質。",
    imageUrl: "/assets/1 首頁/news3.png",
    publishedAt: "2024-06-10T00:00:00.000Z",
  },
  {
    id: 4,
    title: "戰術醫療防禦包新裝備上架",
    description: "針對日常突發狀況與戶外活動，戰術醫療包新裝備已全面上架。本次上架品項包含止血帶、急救貼片與緊湊型醫療組，全數通過高強度使用測試，是個人裝備清單的必備選項。",
    imageUrl: "/assets/1 首頁/news1.png",
    publishedAt: "2024-05-05T00:00:00.000Z",
  },
  {
    id: 5,
    title: "防衛駕駛課程好評加開",
    description: "第一梯次報名踴躍，防衛駕駛加開週末班，協助學員掌握危機應變。課程涵蓋緊急制動、危機迴避路線與夜間行車安全意識，結合講解與實地演練，讓學員在真實路況中建立應對能力。",
    imageUrl: "/assets/1 首頁/news2.png",
    publishedAt: "2024-04-18T00:00:00.000Z",
  },
  {
    id: 6,
    title: "女子防身專班開放報名",
    description: "專為女性設計的防護課程，包含情境演練與合法防具使用，提升自我保護力。課程以安全環境為前提，由女性教練協助帶領，內容涵蓋脫逃技術、語言溝通與法律邊界認識，適合各年齡層女性學員。",
    imageUrl: "/assets/1 首頁/news3.png",
    publishedAt: "2024-03-30T00:00:00.000Z",
  },
];

export const fallbackBlogPosts: FallbackBlogPost[] = [
  {
    id: 1,
    category: "實戰原則",
    title: "遠離衝突的唯一解藥：如何建立正確的狀況覺察？",
    description: "真正的防身，是讓你從一開始就不會受到任何傷害。這篇文章帶你建立實用的狀況覺察。",
    content: "狀況覺察不是緊張，而是建立對環境、距離、人物與出口的持續辨識能力。\n\n大多數人把防身等同於學習打擊技術，然而最高段位的自我保護從來不是反擊——而是避免進入需要反擊的情況。\n\n**OODA 循環的應用**\n\n軍事理論家 John Boyd 提出的 OODA（Observe、Orient、Decide、Act）循環，是狀況覺察的核心框架。每進入一個新場所，你應該快速完成一次 Observe：出入口在哪裡？哪些人顯得異常？誰正在注視你？這不需要十秒鐘，但需要刻意練習才能形成習慣。\n\n**三段距離法則**\n\n將你的感知區域分為三個同心圓：\n- 觸及圈（0-1.5 m）：需要立即應對的威脅區\n- 反應圈（1.5-5 m）：可以採取行動、調整位置的緩衝區\n- 觀察圈（5 m 以上）：情報蒐集區，提早識別潛在威脅\n\n刻意讓自己坐在可以面對入口的位置，是最簡單也最有效的覺察技巧之一。",
    imageUrl: "/assets/14 實戰原則blog/實戰原則cover-1.png",
    readTime: 5,
    publishedAt: "2024-08-15T00:00:00.000Z",
  },
  {
    id: 2,
    category: "實戰原則",
    title: "不是只會揮拳就好，了解戰鬥時的壓力反應",
    description: "了解實戰狀態下的隧道視角與腎上腺素飆升，掌握高壓下的判斷修正。",
    content: "壓力反應會改變視野、動作與決策，唯有重複情境訓練才能降低失誤。\n\n當腎上腺素大量分泌時，人體進入戰鬥或逃跑模式。視野收窄（隧道視角）、精細動作能力下降、聽力鈍化——這些生理反應是進化的產物，但在現代威脅情境中往往成為障礙。\n\n**壓力接種訓練（Stress Inoculation）**\n\n唯一克服壓力反應的方式，是有系統地將自己暴露在可控的壓力情境中，讓神經系統逐步習慣這種喚起狀態。體能消耗後的技術演練、角色扮演情境練習，都是有效的壓力接種工具。\n\n**呼吸控制的關鍵**\n\n4-7-8 呼吸法（吸氣 4 秒、屏氣 7 秒、吐氣 8 秒）可在事前啟動副交感神經，降低腎上腺素峰值。在每次訓練的高強度段落前，試著加入這個技巧，長期下來對實戰判斷力有顯著提升。",
    imageUrl: "/assets/14 實戰原則blog/實戰原則cover-2.png",
    readTime: 8,
    publishedAt: "2024-07-22T00:00:00.000Z",
  },
  {
    id: 3,
    category: "實戰原則",
    title: "你不可不知的自我防衛法律界線",
    description: "如何在合法範圍內完成自我保護，是所有防身訓練都不能忽略的一環。",
    content: "防衛過當往往來自缺乏事前理解與事中判斷，本篇整理基本法律概念。\n\n台灣刑法第 23 條規定：對於現在不法之侵害，而出於防衛自己或他人權利之行為，不罰。但防衛行為過當者，得減輕或免除其刑。\n\n**三個關鍵條件**\n\n合法正當防衛必須同時符合：\n1. **現在性**：威脅是當下正在發生的，而非過去或假設性的\n2. **不法性**：對方的行為確實構成不法侵害\n3. **相當性**：防衛手段與威脅程度相當，不得明顯過度\n\n在訓練中，我們不只教你如何打——更教你何時不應該打，以及如何在事後說清楚你的防衛行為符合法律要求。理解法律邊界，是每位受訓學員的必修課。",
    imageUrl: "/assets/14 實戰原則blog/實戰原則cover-3.png",
    readTime: 6,
    publishedAt: "2024-06-10T00:00:00.000Z",
  },
  {
    id: 4,
    category: "KRAV MAGA",
    title: "Krav Maga：快速反擊的藝術",
    description: "解析 Krav Maga 為何成為世界上最廣泛使用的軍警系統之一。",
    content: "Krav Maga 的核心不是表演，而是以最短路徑解除威脅。\n\nKrav Maga（希伯來語：近身格鬥）由 Imi Lichtenfeld 於 1940 年代發展，最初為以色列軍隊訓練系統。其設計原則非常務實：不追求美觀或競技得分，只追求在最短時間內讓威脅失去攻擊能力。\n\n**Krav Maga 的五大核心原則**\n\n1. 同步防禦與反擊：防守與攻擊同時進行，縮短反應時間\n2. 攻擊要害：眼睛、喉嚨、腹股溝等人體脆弱部位\n3. 持續攻擊直到威脅消失：不讓對方有機會恢復\n4. 使用任何可用工具：環境物件、日常物品皆可成為防衛工具\n5. 立即離開危險場所：解除威脅後的第一件事是撤退\n\nKrav Maga 並非武術競技，而是一套以生存為最終目標的人體工學系統。",
    imageUrl: "/assets/14 實戰原則blog/實戰原則cover-1.png",
    readTime: 10,
    publishedAt: "2024-05-05T00:00:00.000Z",
  },
  {
    id: 5,
    category: "戰術裝備",
    title: "你真的需要戰術腰帶嗎？",
    description: "從訓練需求、攜行邏輯與耐用度，整理新手裝備挑選重點。",
    content: "裝備不是越多越好，而是要符合任務邏輯與使用頻率。\n\n很多人在裝備採購上犯的第一個錯誤，就是「看起來很厲害」就買。戰術腰帶的價值，完全取決於你的訓練頻率與使用場景。\n\n**你需要戰術腰帶的情況**\n\n- 你進行射擊訓練，需要快速拔取備彈或工具\n- 你參與 IPSC、IDPA 等競技射擊活動\n- 你的職業需要在訓練中攜帶多種工具\n\n**一般學員的建議**\n\n若你主要進行徒手防衛訓練，一條品質良好的尼龍腰帶（1.5 吋、雙層）就已足夠。選購時注意：\n- 長橫版扣具比傳統皮帶扣更耐用\n- 內層腰帶搭配外層戰術腰帶系統，可提升穩定性\n- 品牌首選 Blue Alpha、HSGI 或台灣本地的 Gear Store\n\n裝備是為訓練服務的，先確定你的訓練需求，再決定裝備規格。",
    imageUrl: "/assets/14 實戰原則blog/實戰原則cover-2.png",
    readTime: 7,
    publishedAt: "2024-04-18T00:00:00.000Z",
  },
];

export const fallbackCourses: FallbackCourse[] = [
  {
    slug: "1",
    titleEn: "PRACTICAL PRINCIPLES",
    titleZh: "實戰原則",
    subtitle: "重新定義你的防衛能力與應對框架",
    intro: "一套以實戰為導向、整合心理、戰術判斷與應對能力的課程，協助學員建立完整防衛框架。",
    targets: [
      "希望提升日常安全意識與防衛思維者",
      "有出差與高移動需求的工作者",
      "軍警與執法人員",
      "想用系統化方式建立防衛基礎的初學者",
    ],
    modules: [
      { title: "威脅意識", desc: "掌握環境觀察與風險前兆判讀。" },
      { title: "心理穩定", desc: "在高壓狀況下保持冷靜與判斷力。" },
      { title: "語言溝通", desc: "透過口語策略降低衝突升級風險。" },
      { title: "裝備使用", desc: "理解合法與有效的防衛裝備應用。" },
    ],
    bannerImage: "/assets/4 課程1/課程1 banner.png",
    listImage: "/assets/3 課程列表/課程1.png",
    sortOrder: 1,
  },
  {
    slug: "2",
    titleEn: "KIDS SELF-DEFENSE",
    titleZh: "兒童防衛",
    subtitle: "從觀念到行動，建立安全邊界",
    intro: "透過情境演練與清楚的危機辨識，讓孩子建立求助、脫困與自我保護能力。",
    targets: ["國小至國中學生", "希望強化孩子安全教育的家長", "需要團體防衛課程的教育單位"],
    modules: [
      { title: "安全邊界", desc: "認識陌生人風險與身體界線。" },
      { title: "口語求助", desc: "練習清楚拒絕與求援表達。" },
      { title: "脫困動作", desc: "以簡單高成功率動作完成脫困。" },
      { title: "情境演練", desc: "在模擬情境中建立反應習慣。" },
    ],
    bannerImage: "/assets/5 課程2/banner.png",
    listImage: "/assets/3 課程列表/課程2.png",
    sortOrder: 2,
  },
  {
    slug: "3",
    titleEn: "KRAV MAGA",
    titleZh: "KRAV MAGA",
    subtitle: "以色列近身格鬥｜快速反擊的藝術",
    intro: "融合街頭防身、拳擊與摔角精髓，專注於最短時間解除威脅並離開危險。",
    targets: ["希望快速學習有效防衛技術者", "軍警與安全人員", "對以色列格鬥技術有興趣的學員"],
    modules: [
      { title: "基礎戒備", desc: "建立站姿、距離與預備反應。" },
      { title: "拳擊組合", desc: "學習高效率打擊連段。" },
      { title: "解脫技術", desc: "面對抓持、扼喉時快速脫困。" },
      { title: "地面防護", desc: "地面受制時的起身與反擊。" },
    ],
    bannerImage: "/assets/6 課程3/banner.png",
    listImage: "/assets/3 課程列表/課程3.png",
    sortOrder: 3,
  },
  {
    slug: "4",
    titleEn: "WOMEN'S SELF DEFENSE",
    titleZh: "女子防衛",
    subtitle: "針對常見侵害情境設計的保護訓練",
    intro: "從距離管理、脫逃技術到合法防具認識，建立女性在日常通勤與社交場景中的安全感。",
    targets: ["一般女性學員", "夜間通勤族", "需要建立基礎防身能力者"],
    modules: [
      { title: "風險辨識", desc: "辨識尾隨、包圍與搭訕風險。" },
      { title: "脫逃反應", desc: "針對抓手、抱持等情境脫困。" },
      { title: "防具認識", desc: "合法防護工具的選擇與使用。" },
      { title: "模擬演練", desc: "用情境建立可執行的應對流程。" },
    ],
    bannerImage: "/assets/7 課程4/banner.png",
    listImage: "/assets/3 課程列表/課程4.png",
    sortOrder: 4,
  },
  {
    slug: "5",
    titleEn: "TACTICAL APPLICATION",
    titleZh: "戰術應用",
    subtitle: "將理論化為可執行的真實行動方案",
    intro: "著眼於現實情境的操作訓練，包含移動、掩護、協同與壓力下的決策。",
    targets: ["進階學員", "安全主管與護衛人員", "高風險環境工作者"],
    modules: [
      { title: "環境評估", desc: "快速辨識威脅與出口。" },
      { title: "掩護移動", desc: "利用地形安全位移。" },
      { title: "協同防衛", desc: "多人協作的配置與溝通。" },
      { title: "壓力決策", desc: "在高壓下保持判斷與行動。" },
    ],
    bannerImage: "/assets/8 課程5/banner.png",
    listImage: "/assets/3 課程列表/課程5.png",
    sortOrder: 5,
  },
  {
    slug: "6",
    titleEn: "DEFENSIVE DRIVING",
    titleZh: "防衛駕駛",
    subtitle: "在移動載具中建立危機預防與應變能力",
    intro: "針對通勤、長途移動與高風險路況設計的防衛駕駛課程，強調預防、脫困與通報。",
    targets: ["業務與常出差族群", "企業車隊管理者", "重視行車風險控管的學員"],
    modules: [
      { title: "風險預判", desc: "觀察可疑車輛與行車環境。" },
      { title: "脫離路線", desc: "建立撤離與替代路線規劃。" },
      { title: "車內應對", desc: "車內受威脅時的處置流程。" },
      { title: "事故應變", desc: "事故與攔停情境的安全反應。" },
    ],
    bannerImage: "/assets/9 課程6/banner.png",
    listImage: "/assets/3 課程列表/課程6.png",
    sortOrder: 6,
  },
  {
    slug: "7",
    titleEn: "FIRST AID",
    titleZh: "急救與救護",
    subtitle: "黃金時間內的關鍵處置能力",
    intro: "結合現場安全、止血、包紮與呼救流程，讓學員能在第一時間穩定傷患狀態。",
    targets: ["戶外活動者", "企業與團隊主管", "希望提升急救應變能力者"],
    modules: [
      { title: "現場評估", desc: "先保護自己再介入救護。" },
      { title: "止血固定", desc: "掌握常見外傷處置流程。" },
      { title: "搬運支援", desc: "建立安全搬運與協作觀念。" },
      { title: "通報整合", desc: "與外部醫療資源有效銜接。" },
    ],
    bannerImage: "/assets/10 課程7/banner.png",
    listImage: "/assets/3 課程列表/課程7.png",
    sortOrder: 7,
  },
  {
    slug: "8",
    titleEn: "EQUIPMENT APPLICATION",
    titleZh: "防身裝備應用",
    subtitle: "從選擇到使用，建立正確攜行邏輯",
    intro: "協助學員理解裝備用途、法規、攜行位置與訓練方式，避免錯誤依賴與誤用。",
    targets: ["防身工具使用者", "裝備入門新手", "希望優化日常攜行系統者"],
    modules: [
      { title: "裝備分類", desc: "辨識不同工具的任務定位。" },
      { title: "攜行規劃", desc: "建立符合日常使用的配置。" },
      { title: "合法使用", desc: "理解法規與責任邊界。" },
      { title: "情境操作", desc: "在安全條件下進行情境演練。" },
    ],
    bannerImage: "/assets/11 課程8/banner.png",
    listImage: "/assets/3 課程列表/課程8.png",
    sortOrder: 8,
  },
  {
    slug: "9",
    titleEn: "CORPORATE TRAINING",
    titleZh: "團體/企業包班",
    subtitle: "依需求客製的安全與戰術訓練方案",
    intro: "提供企業、社群與專業單位量身規劃的訓練模組，從安全意識到實戰應對皆可客製。",
    targets: ["企業團隊", "教育單位", "特殊任務與專業團體"],
    modules: [
      { title: "需求訪談", desc: "釐清訓練目標與風險場景。" },
      { title: "內容設計", desc: "量身配置課程與強度。" },
      { title: "實地演練", desc: "導入真實場景模擬。" },
      { title: "成果回饋", desc: "訓後評估與優化建議。" },
    ],
    bannerImage: "/assets/12 課程9/banner.png",
    listImage: "/assets/3 課程列表/課程9.png",
    sortOrder: 9,
  },
];

export function getFallbackCourseBySlug(slug: string) {
  return fallbackCourses.find((course) => course.slug === slug) ?? fallbackCourses[0];
}