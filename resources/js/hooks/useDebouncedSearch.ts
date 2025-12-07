import { DebouncedSearchReturn, SearchParams } from '@/components/types/types';
import { router } from '@inertiajs/react';
import { isEqual, pickBy } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

// Utility function to clean empty values from params
const cleanParams = (params: SearchParams): SearchParams => {
    return pickBy(params, (value) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return value !== '' && value !== null && value !== undefined;
    }) as SearchParams;
};

// Utility function to serialize params for comparison
const serializeParams = (params: SearchParams): string => {
    return JSON.stringify(cleanParams(params));
};

interface UseDebouncedSearchOptions {
    initialTimeDebounce?: number;
    preserveState?: boolean;
    preserveScroll?: boolean;
    replace?: boolean;
    onStart?: () => void;
    onFinish?: () => void;
    onError?: (error: unknown) => void;
}

const useDebouncedSearch = (
    url: string,
    initialParams: SearchParams = {},
    options: UseDebouncedSearchOptions = {},
): DebouncedSearchReturn => {
    const {
        initialTimeDebounce = 300,
        preserveState = true,
        preserveScroll = true,
        replace = true,
        onStart,
        onFinish,
        onError,
    } = options;

    // State management
    const [params, setParams] = useState<SearchParams>(initialParams);
    const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
    const [isLoading, setIsLoading] = useState(false);

    // Refs for tracking
    const prevParamsRef = useRef<string>(serializeParams(initialParams));
    const abortControllerRef = useRef<AbortController | null>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Search function
    const performSearch = useCallback(
        (searchParams: SearchParams) => {
            // Cancel any pending requests
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new abort controller
            abortControllerRef.current = new AbortController();

            const cleanedParams = cleanParams(searchParams);

            setIsLoading(true);
            onStart?.();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            router.get(url, cleanedParams as any, {
                replace,
                preserveState,
                preserveScroll,
                queryStringArrayFormat: 'indices',
                onSuccess: () => {
                    setIsLoading(false);
                    onFinish?.();
                },
                onError: (error) => {
                    setIsLoading(false);
                    onError?.(error);
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        },
        [
            url,
            replace,
            preserveState,
            preserveScroll,
            onStart,
            onFinish,
            onError,
        ],
    );

    // Effect to handle parameter changes with debouncing
    useEffect(() => {
        const currentParamsSerialized = serializeParams(params);
        const prevParamsSerialized = prevParamsRef.current;

        // Only search if params have actually changed
        if (currentParamsSerialized !== prevParamsSerialized) {
            // Clear existing timeout
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            // Set new timeout for search
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(params);
            }, timeDebounce);
        }

        // Update previous params reference
        prevParamsRef.current = currentParamsSerialized;

        // Cleanup function
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [params, timeDebounce, performSearch]);

    // Enhanced setParams with validation and optimization
    const enhancedSetParams = useCallback((newParams: SearchParams) => {
        setParams((prevParams) => {
            // Deep comparison to avoid unnecessary updates
            if (isEqual(prevParams, newParams)) {
                return prevParams;
            }

            // Reset to first page when filters change (except for page changes)
            const shouldResetPage =
                newParams.search !== prevParams.search ||
                !isEqual(newParams.filters, prevParams.filters) ||
                newParams.sort !== prevParams.sort ||
                newParams.direction !== prevParams.direction;

            const finalParams =
                shouldResetPage && newParams.page === prevParams.page
                    ? { ...newParams, page: 1 }
                    : newParams;

            return finalParams;
        });
    }, []);

    // Enhanced setTimeDebounce with validation
    const enhancedSetTimeDebounce = useCallback((time: number) => {
        const validatedTime = Math.max(0, Math.min(5000, time)); // Clamp between 0-5000ms
        setTimeDebounce(validatedTime);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return {
        params,
        setParams: enhancedSetParams,
        setTimeDebounce: enhancedSetTimeDebounce,
        isLoading,
    };
};

export default useDebouncedSearch;
