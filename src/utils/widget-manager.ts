import { sidebarLayoutConfig } from "../config";
import type {
	SidebarLayoutConfig,
	WidgetComponentConfig,
	WidgetComponentType,
} from "../types/config";

/**
 * 组件映射表 - 将组件类型映射到实际的组件路径
 */
export const WIDGET_COMPONENT_MAP = {
	profile: "../components/widget/Profile.astro",
	announcement: "../components/widget/Announcement.astro",
	categories: "../components/widget/Categories.astro",
	tags: "../components/widget/Tags.astro",
	toc: "../components/widget/TOC.astro",
	"music-player": "../components/widget/MusicPlayer.svelte",
	pio: "../components/widget/Pio.astro",
	"site-stats": "../components/widget/SiteStats.astro",
	calendar: "../components/widget/Calendar.astro",
	custom: null,
} as const;

/**
 * 组件管理器类
 */
export class WidgetManager {
	private config: SidebarLayoutConfig;

	constructor(config: SidebarLayoutConfig = sidebarLayoutConfig) {
		this.config = config;
	}

	/**
	 * 获取配置
	 */
	getConfig(): SidebarLayoutConfig {
		return this.config;
	}

	/**
	 * 根据位置获取组件列表
	 */
	getComponentsByPosition(
		position: "top" | "sticky",
		sidebar: "left" | "right" | "drawer" = "left",
		deviceType: "mobile" | "tablet" | "desktop" = "desktop",
	): WidgetComponentConfig[] {
		let activeSidebar = sidebar;

		if (deviceType === "mobile") {
			activeSidebar = "drawer";
		}

		else if (deviceType === "tablet") {
			if (sidebar === "right") {
				return [];
			}
			if (sidebar === "left") {
				activeSidebar =
					(this.config.components.left ?? []).length > 0 ? "left" : "right";
			}
		}

		// 🔥 核心修复：components / left / right / drawer 全部兜底为 []
		const components = this.config.components ?? { left: [], right: [], drawer: [] };
		const componentTypes = components[activeSidebar] ?? [];

		return componentTypes
			.map((type) => {
				const prop = (this.config.properties ?? []).find((p) => p.type === type);
				if (prop && prop.position === position) {
					return prop;
				}
				if (!prop && position === "top") {
					return { type, position: "top" } as WidgetComponentConfig;
				}
				return null;
			})
			.filter((item): item is WidgetComponentConfig => item !== null);
	}

	/**
	 * 动画延迟
	 */
	getAnimationDelay(component: WidgetComponentConfig, index: number): number {
		if (component.animationDelay !== undefined) {
			return component.animationDelay;
		}

		const defaultAnimation = this.config.defaultAnimation ?? { enable: false, baseDelay: 0, increment: 0 };
		if (defaultAnimation.enable) {
			return defaultAnimation.baseDelay + index * defaultAnimation.increment;
		}

		return 0;
	}

	/**
	 * CSS 类名
	 */
	getComponentClass(
		component: WidgetComponentConfig,
		_index: number,
	): string {
		const classes: string[] = [];

		if (component.class) {
			classes.push(component.class);
		}

		if (component.responsive?.hidden) {
			component.responsive.hidden.forEach((device) => {
				switch (device) {
					case "mobile":
						classes.push("hidden", "md:block");
						break;
					case "tablet":
						classes.push("md:hidden", "lg:block");
						break;
					case "desktop":
						classes.push("lg:hidden");
						break;
				}
			});
		}

		return classes.join(" ");
	}

	/**
	 * 内联样式
	 */
	getComponentStyle(component: WidgetComponentConfig, index: number): string {
		const styles: string[] = [];

		if (component.style) {
			styles.push(component.style);
		}

		const animationDelay = this.getAnimationDelay(component, index);
		if (animationDelay > 0) {
			styles.push(`animation-delay: ${animationDelay}ms`);
		}

		return styles.join("; ");
	}

	/**
	 * 是否折叠
	 */
	isCollapsed(component: WidgetComponentConfig, itemCount: number): boolean {
		if (!component.responsive?.collapseThreshold) {
			return false;
		}
		return itemCount >= component.responsive.collapseThreshold;
	}

	/**
	 * 获取组件路径
	 */
	getComponentPath(componentType: WidgetComponentType): string | null {
		return WIDGET_COMPONENT_MAP[componentType];
	}

	/**
	 * 是否显示侧边栏
	 */
	shouldShowSidebar(deviceType: "mobile" | "tablet" | "desktop"): boolean {
		const left = this.config.components?.left ?? [];
		const right = this.config.components?.right ?? [];
		const drawer = this.config.components?.drawer ?? [];

		if (deviceType === "mobile") {
			return drawer.length > 0;
		}
		if (deviceType === "tablet") {
			return left.length > 0 || right.length > 0;
		}
		return left.length > 0 || right.length > 0;
	}

	/**
	 * 获取断点
	 */
	getBreakpoints() {
		return this.config.responsive?.breakpoints ?? { tablet: 768, desktop: 1024 };
	}

	/**
	 * 更新配置
	 */
	updateConfig(newConfig: Partial<SidebarLayoutConfig>): void {
		this.config = { ...this.config, ...newConfig };
	}

	/**
	 * 添加组件
	 */
	addComponentToLayout(
		type: WidgetComponentType,
		sidebar: "left" | "right" | "drawer" = "left",
	): void {
		const list = this.config.components[sidebar] ?? [];
		if (!list.includes(type)) {
			list.push(type);
			this.config.components[sidebar] = list;
		}
	}

	/**
	 * 移除组件
	 */
	removeComponentFromLayout(type: WidgetComponentType): void {
		this.config.components.left = (this.config.components.left ?? []).filter(t => t !== type);
		this.config.components.right = (this.config.components.right ?? []).filter(t => t !== type);
		this.config.components.drawer = (this.config.components.drawer ?? []).filter(t => t !== type);
	}

	/**
	 * 是否侧边栏组件
	 */
	isSidebarComponent(componentType: WidgetComponentType): boolean {
		return componentType !== "pio";
	}
}

export const widgetManager = new WidgetManager();

export function getComponentConfig(
	componentType: WidgetComponentType,
): WidgetComponentConfig | undefined {
	return (widgetManager.getConfig().properties ?? [])
		.find((p) => p.type === componentType);
}

export function isComponentEnabled(
	componentType: WidgetComponentType,
): boolean {
	const config = widgetManager.getConfig().components ?? { left: [], right: [], drawer: [] };
	return (
		(config.left ?? []).includes(componentType) ||
		(config.right ?? []).includes(componentType) ||
		(config.drawer ?? []).includes(componentType)
	);
}

export function getEnabledComponentTypes(): WidgetComponentType[] {
	return widgetManager.getConfig().components.left ?? [];
}
