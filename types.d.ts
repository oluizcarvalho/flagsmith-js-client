type IFlagsmithValue<T = string | number | boolean | null> = T

export type DynatraceObject = {
    "javaLongOrObject": Record<string, number>,
    "date": Record<string, Date>,
    "shortString": Record<string, string>,
    "javaDouble": Record<string, number>,
}
export interface IFlagsmithFeature {
    id?: number;
    enabled: boolean;
    value?: IFlagsmithValue;
}

export declare type IFlagsmithTrait = IFlagsmithValue;
export declare type IFlags<F extends string = string> = Record<F, IFlagsmithFeature>;
export declare type ITraits<T extends string = string> = Record<T, IFlagsmithTrait>;

export declare type GetValueOptions<T = Array<any> | object> = {
    skipAnalytics?: boolean
    json?: boolean
    fallback?: T
}

export declare type HasFeatureOptions = {
    skipAnalytics?: boolean
    fallback?: boolean
} | boolean


export interface IRetrieveInfo {
    isFromServer: boolean;
    flagsChanged: string[] | null;
    traitsChanged: string[] | null;
}

export interface IState<F extends string = string, T extends string = string> {
    api: string;
    environmentID: string;
    flags?: IFlags<F>;
    evaluationEvent?: Record<string, Record<string, number>> | null;
    identity?: string;
    traits: ITraits<T>;
}

declare type ICacheOptions = {
    ttl?: number;
    skipAPI?: boolean;
};

export declare type IDatadogRum = {
    trackTraits: boolean
    client: {
        setUser: (newUser: {
            [x: string]: unknown
        }) => void;
        getUser: () => {
            [x: string]: unknown
        };
        [extraProps: string]: any
    }
}

export declare enum FlagSource {
    "NONE" = "NONE",
    "DEFAULT_FLAGS" = "DEFAULT_FLAGS",
    "CACHE" = "CACHE",
    "SERVER" = "SERVER",
}

export declare type LoadingState = {
    error: Error | null, // Current error, resets on next attempt to fetch flags
    isFetching: boolean, // Whether there is a current request to fetch server flags
    isLoading: boolean,  // Whether any flag data exists
    source: FlagSource //Indicates freshness of flags
}

export type OnChange<F extends string = string> = (previousFlags: IFlags<F> | null, params: IRetrieveInfo, loadingState:LoadingState) => void
export interface IInitConfig<F extends string = string, T extends string = string> {
    AsyncStorage?: any;
    api?: string;
    cacheFlags?: boolean;
    cacheOptions?: ICacheOptions;
    datadogRum?: IDatadogRum;
    defaultFlags?: IFlags<F>;
    fetch?: any;
    realtime?: boolean;
    eventSourceUrl?: string;
    enableAnalytics?: boolean;
    enableDynatrace?: boolean;
    enableLogs?: boolean;
    angularHttpClient?: any;
    environmentID: string;
    headers?: object;
    identity?: string;
    traits?: ITraits<T>;
    onChange?: OnChange<F>;
    onError?: (err: Error) => void;
    preventFetch?: boolean;
    state?: IState;
    _trigger?: () => void;
    _triggerLoadingState?: () => void;
}

export interface IFlagsmithResponse {
    traits?: {
        trait_key: string;
        trait_value: IFlagsmithValue;
    }[];
    flags?: {
        enabled: boolean;
        feature_state_value: IFlagsmithValue;
        feature: {
            id: number;
            name: string;
        };
    }[];
}

export interface IFlagsmith<F extends string = string, T extends string = string> {
    /**
     * Initialise the sdk against a particular environment
     */
    init: (config: IInitConfig<F, T>) => Promise<void>;
    /**
     * Trigger a manual fetch of the environment features
     */
    getFlags: () => Promise<void>;
    /**
     * Returns the current flags
     */
    getAllFlags: () => IFlags<F>;
    /**
     * Identify user, triggers a call to get flags if flagsmith.init has been called
     */
    identify: (userId: string, traits?: Record<T, IFlagsmithValue>) => Promise<void>;
    /**
     * Retrieves the current state of flagsmith
     */
    getState: () => IState;
    /**
     * Set the current state of flagsmith
     */
    setState: (state: IState) => void;
    /**
     * Clears the identity, triggers a call to getFlags
     */
    logout: () => Promise<void>;
    /**
     * Polls the flagsmith API, specify interval in ms
     */
    startListening: (interval?: number) => void;
    /**
     * Stops polling
     */
    stopListening: () => void;
    /**
     * Returns whether a feature is enabled, or a fallback value if it does not exist.
     * @param {HasFeatureOptions} [optionsOrSkipAnalytics=false] If `true`, will not track analytics for this flag
     * evaluation. Using a boolean for this parameter is deprecated - use `{ skipAnalytics: true }` instead.
     * @param [optionsOrSkipAnalytics.fallback=false] Returns this value if the feature does not exist.
     * @param [optionsOrSkipAnalytics.skipAnalytics=false] If `true`, do not track analytics for this feature evaluation.
     * @example
     * flagsmith.hasFeature("power_user_feature")
     * @example
     * flagsmith.hasFeature("enabled_by_default_feature", { fallback: true })
     */
    hasFeature: (key: F, optionsOrSkipAnalytics?: HasFeatureOptions) => boolean;

    /**
     * Returns the value of a feature, or a fallback value.
     * @param [options.json=false] Deserialise the feature value using `JSON.parse` and return the result or `options.fallback`.
     * @param [options.fallback=null] Return this value in any of these cases:
     * * The feature does not exist.
     * * The feature has no value.
     * * `options.json` is `true` and the feature's value is not valid JSON.
     * @param [options.skipAnalytics=false] If `true`, do not track analytics for this feature evaluation.
     * @param [skipAnalytics=false] Deprecated - use `options.skipAnalytics` instead.
     * @example
     * flagsmith.getValue("remote_config") // "{\"hello\":\"world\"}"
     * flagsmith.getValue("remote_config", { json: true }) // { hello: "world" }
     * @example
     * flagsmith.getValue("font_size") // "12px"
     * flagsmith.getValue("font_size", { json: true, fallback: "8px" }) // "8px"
     */
    getValue<T = IFlagsmithValue>(key: F, options?: GetValueOptions<T>, skipAnalytics?: boolean): IFlagsmithValue<T>;

    /**
     * Get the value of a particular trait for the identified user
     */
    getTrait: (key: T) => IFlagsmithValue;
    /**
     * Get the values of all traits for the identified user
     */
    getAllTraits: () => Record<string, IFlagsmithValue>;
    /**
     * Set a specific trait for a given user id, triggers a call to get flags
     */
    setTrait: (key: T, value: IFlagsmithValue) => Promise<void>;
    /**
     * Set a key value set of traits for a given user, triggers a call to get flags
     */
    setTraits: (traits: Record<T, IFlagsmithValue>) => Promise<void>;
    /**
     * The stored identity of the user
     */
    identity?: string;
    /**
     * Whether the flagsmith SDK is initialised
     */
    initialised?: boolean;

    /**
     * Returns ths current loading state
     */
    loadingState?: LoadingState;

    /**
     * Used internally, this function will callback separately to onChange whenever flags are updated
     */
    _trigger?: () => void;
    /**
     * Used internally, this function will trigger the useFlagsmithLoading hook when loading state changes
     */
    _triggerLoadingState?: () => void;
    /**
     * Used internally, this function will console log if enableLogs is being set within flagsmith.init
     */
    log: (message?: any, ...optionalParams: any[]) => void;
    /**
     * Used internally, this is the cache options provided in flagsmith.init
     */
    cacheOptions: {
        ttl: number;
        skipAPI: boolean;
    };
    /**
     * Used internally, this is the api provided in flagsmith.init, defaults to our production API
     */
    api: string
    /**
     * Used internally, this is the environmentID provided in flagsmith.init or as part of serverState
     */
    environmentID: string | null
}

export {};
