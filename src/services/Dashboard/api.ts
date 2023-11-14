import { ValidCategories } from "../../types/types";

export interface DashboardInfoInterface {
    count: number,
    closed: number,
    deliveredTotal: number,
    avgTime: number,
    prwsYearCount: number,
    prwsYearClosed: number,
    prwsYearDeliveredTotal: number,
    prwsYearAvgTime: number,
    tradeTrends: TradeTrendsInterface[],
    categoryTrends: CategoryTrendsInterface[],
    quantityTrends: QuantityTrendsInterface[]
}

export interface TradeTrendsInterface {
    count: number;
    ms: number;
}

export interface CategoryTrendsInterface {
    category: ValidCategories;
    perc: number;
}

export interface QuantityTrendsInterface {
    ms: number;
    count: number;
}