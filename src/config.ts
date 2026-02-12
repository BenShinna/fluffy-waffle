import type {
  AnnouncementConfig,
  CommentConfig,
  ExpressiveCodeConfig,
  FooterConfig,
  FullscreenWallpaperConfig,
  LicenseConfig,
  MusicPlayerConfig,
  NavBarConfig,
  PermalinkConfig,
  ProfileConfig,
  SakuraConfig,
  ShareConfig,
  SidebarLayoutConfig,
  SiteConfig,
  PioConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

const SITE_LANG = "en";
const SITE_TIMEZONE = 8;

export const siteConfig: SiteConfig = {
  title: "挪威的经、",
  subtitle: "神游竹幕之外",
  siteURL: "https://tm-self.vercel.app",
  siteStartDate: "2026-01-11",
  timeZone: SITE_TIMEZONE,
  lang: SITE_LANG,
  themeColor: { hue: 0, fixed: false },
  
  featurePages: {
    anime: false,
    diary: false,
    friends: false,
    projects: false,
    skills: false,
    timeline: false,
    albums: false,
    devices: false,
  },
  
  navbarTitle: {
    text: "寒灰集",
    icon: "assets/home/icon.jpg",
  },
  
  bangumi: { userId: "your-bangumi-id", fetchOnDev: false },
  anime: { mode: "local" },
  
  postListLayout: { defaultMode: "list", allowSwitch: true },
  tagStyle: { useNewStyle: false },
  
  wallpaperMode: {
    defaultMode: "fullscreen",
    showModeSwitchOnMobile: "desktop",
  },
  
  banner: {
    src: {
      desktop: ["https://www.loliapi.com/acg/",      "http://api.weboss.hk/random/api.php?type=pc"],
      mobile: ["https://www.loliapi.com/acg/",
"http://api.weboss.hk/random/api.php?type=pe"],
    },
    position: "center",
    carousel: { enable: false, interval: 1.5 },
    waves: { enable: false, performanceMode: false, mobileDisable: false },
    imageApi: { enable: false, url: "" },
    homeText: {
      enable: false,
      title: "",
      subtitle: [],
      typewriter: { enable: false, speed: 100, deleteSpeed: 50, pauseTime: 2000 },
    },
    credit: { enable: false, text: "", url: "" },
    navbar: { transparentMode: "semi" },
  },
  
  toc: { enable: true, mode: "sidebar", depth: 2, useJapaneseBadge: true },
  showCoverInContent: true,
  generateOgImages: false,
  favicon: [],
  
  // 字体配置
	font: {
		// 注意：自定义字体需要在 src/styles/main.css 中引入字体文件
		// 注意：字体子集优化功能目前仅支持 TTF 格式字体,开启后需要在生产环境才能看到效果,在Dev环境下显示的是浏览器默认字体!
		asciiFont: {
			// 英文字体 - 优先级最高
			// 指定为英文字体则无论字体包含多大范围，都只会保留 ASCII 字符子集
			fontFamily: "ZenMaruGothic-Medium",
			fontWeight: "400",
			localFonts: ["ZenMaruGothic-Medium.ttf"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
		cjkFont: {
			// 中日韩字体 - 作为回退字体
			fontFamily: "萝莉体 第二版",
			fontWeight: "500",
			localFonts: ["萝莉体 第二版.ttf"],
			enableCompress: true, // 启用字体子集优化，减少字体文件大小
		},
	},
	showLastModified: true, // 控制"上次编辑"卡片显示的开关
};

export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  src: {
    desktop: ["https://www.loliapi.com/acg/",
"http://api.weboss.hk/random/api.php?type=pc"],
    mobile: ["https://www.loliapi.com/acg/",
"http://api.weboss.hk/random/api.php?type=pe"],
  },
  position: "center",
  carousel: { enable: true, interval: 99 },
  zIndex: -1,
  opacity: 1,
  blur: 0,
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    {
      name: "About",
      url: "/about/",
      icon: "fa6-solid:circle-info",
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "https://raw.githubusercontent.com/BenShinna/.tm/refs/heads/master/public/assets/home/avatar.jpg",
  name: "叶姗",
  bio: "神游竹幕之外",
  typewriter: {
    enable: true,
    speed: 80,
  },
  links: [
    {
      name: "Email",
      icon: "fa6-solid:envelope",
      url: "mailto:xjbdv1@163.com",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: false,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const permalinkConfig: PermalinkConfig = {
  enable: true,
  format: "%postname%",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  theme: "github-dark",
  hideDuringThemeTransition: true,
};

export const commentConfig: CommentConfig = {
  enable: false,
  twikoo: { envId: "", lang: SITE_LANG },
};

export const shareConfig: ShareConfig = {
  enable: true,
};

export const announcementConfig: AnnouncementConfig = {
  title: "Announcement",
  content: "一切只待上帝安排",
  closable: true,
  link: { enable: true, text: "Learn More", url: "/about/", external: false },
};

export const musicPlayerConfig: MusicPlayerConfig = {
  enable: false,
  mode: "meting",
  meting_api: "",
  id: "",
  server: "netease",
  type: "playlist",
};

export const footerConfig: FooterConfig = {
  enable: false,
  customHtml: "",
};

export const sidebarLayoutConfig: SidebarLayoutConfig = {
  position: "right",
  components: [
    {
      type: "profile",
      enable: true,
      order: 1,
      position: "top",
      sidebar: "left",
      class: "onload-animation",
      animationDelay: 0,
    },
    {
      type: "announcement",
      enable: true,
      order: 2,
      position: "top",
      sidebar: "left",
      class: "onload-animation",
      animationDelay: 50,
    },
    {
      type: "categories",
      enable: true,
      order: 3,
      position: "sticky",
      sidebar: "left",
      class: "onload-animation",
      animationDelay: 150,
      responsive: { collapseThreshold: 5 },
    },
    {
      type: "tags",
      enable: true,
      order: 4,
      position: "top",
      sidebar: "left",
      class: "onload-animation",
      animationDelay: 250,
      responsive: { collapseThreshold: 20 },
    },
    {
      type: "site-stats",
      enable: true,
      order: 5,
      position: "top",
      sidebar: "right",
      class: "onload-animation",
      animationDelay: 200,
    },
    {
      type: "calendar",
      enable: true,
      order: 6,
      position: "top",
      sidebar: "right",
      class: "onload-animation",
      animationDelay: 250,
    },
  ],
  defaultAnimation: { enable: true, baseDelay: 0, increment: 50 },
  responsive: {
    breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 },
    layout: { mobile: "sidebar", tablet: "sidebar", desktop: "sidebar" },
  },
};

export const sakuraConfig: SakuraConfig = {
  enable: false,
  sakuraNum: 21,
  limitTimes: -1,
  size: { min: 0.5, max: 1.1 },
  opacity: { min: 0.3, max: 0.9 },
  speed: {
    horizontal: { min: -1.7, max: -1.2 },
    vertical: { min: 1.5, max: 2.2 },
    rotation: 0.03,
    fadeSpeed: 0.03,
  },
  zIndex: 100,
};

export const pioConfig: PioConfig = {
  enable: false,
  models: ["/pio/models/pio/model.json"],
  position: "left",
  width: 280,
  height: 250,
  mode: "draggable",
  hiddenOnMobile: true,
  dialog: {
    welcome: "Welcome to Mizuki Website!",
    touch: [
      "What are you doing?",
      "Stop touching me!",
      "HENTAI!",
      "Don't bully me like that!",
    ],
    home: "Click here to go back to homepage!",
    skin: ["Want to see my new outfit?", "The new outfit looks great~"],
    close: "QWQ See you next time~",
    link: "https://github.com/matsuzaka-yuki/Mizuki",
  },
};

// 添加 widgetConfigs 导出
export const widgetConfigs = {
  profile: profileConfig,
  announcement: announcementConfig,
  music: musicPlayerConfig,
  layout: sidebarLayoutConfig,
  sakura: sakuraConfig,
  fullscreenWallpaper: fullscreenWallpaperConfig,
  pio: pioConfig,
  share: shareConfig,
};

export const umamiConfig = {
  enabled: false,
  apiKey: "api_xxxxxxxx",
  baseUrl: "https://api.umami.is",
  scripts: "",
} as const;
