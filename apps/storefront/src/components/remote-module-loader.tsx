'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactJSXRuntime from 'react/jsx-runtime';
import { createInstance } from '@module-federation/enhanced/runtime';
import { ErrorState, Skeleton } from '@nextcommerce/ui';
import { storefrontEnv } from '@/lib/env';

let mfInstance: ReturnType<typeof createInstance> | null = null;

function getFederationInstance() {
  if (!mfInstance) {
    mfInstance = createInstance({
      name: 'storefront_host',
      shareStrategy: 'loaded-first',
      remotes: [
        {
          name: 'catalog_remote',
          entry: storefrontEnv.NEXT_PUBLIC_CATALOG_REMOTE_URL,
          type: 'module',
        },
      ],
      shared: {
        react: {
          version: React.version,
          scope: 'default',
          lib: () => React,
          shareConfig: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
        },
        'react/jsx-runtime': {
          version: React.version,
          scope: 'default',
          lib: () => ReactJSXRuntime,
          shareConfig: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
        },
        'react-dom': {
          version: React.version,
          scope: 'default',
          lib: () => ReactDOM,
          shareConfig: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
        },
        'react-dom/client': {
          version: React.version,
          scope: 'default',
          lib: () => ReactDOMClient,
          shareConfig: {
            singleton: true,
            requiredVersion: '^19.0.0',
          },
        },
      },
    });
  }

  return mfInstance;
}

class RemoteErrorBoundary extends React.Component<
  { fallbackTitle: string; onRetry: () => void; children: React.ReactNode },
  { hasError: boolean; errorMessage?: string }
> {
  constructor(props: { fallbackTitle: string; onRetry: () => void; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title={this.props.fallbackTitle}
          description={
            this.state.errorMessage ??
            'The remote micro frontend is currently unavailable. Core storefront navigation remains operational.'
          }
          onRetry={() => {
            this.setState({ hasError: false, errorMessage: undefined });
            this.props.onRetry();
          }}
        />
      );
    }
    return this.props.children;
  }
}

function RemoteSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-44 w-full" />
    </div>
  );
}

export interface RemoteModuleLoaderProps {
  remotePath: 'catalog_remote/ProductGrid' | 'catalog_remote/ProductFilters';
  fallbackTitle?: string;
}

export function RemoteModuleLoader({
  remotePath,
  fallbackTitle = 'Remote module unavailable',
}: RemoteModuleLoaderProps) {
  const [mounted, setMounted] = React.useState(false);
  const [retryKey, setRetryKey] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const LazyRemoteComponent = React.useMemo(
    () =>
      React.lazy(async () => {
        const instance = getFederationInstance();
        const mod = await instance.loadRemote<{ default: React.ComponentType }>(remotePath);
        if (!mod?.default) {
          throw new Error(`Remote module "${remotePath}" did not export a default component.`);
        }
        return mod;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [remotePath, retryKey],
  );

  if (!mounted) {
    return <RemoteSkeleton />;
  }

  return (
    <RemoteErrorBoundary
      fallbackTitle={fallbackTitle}
      onRetry={() => setRetryKey((prev) => prev + 1)}
    >
      <React.Suspense fallback={<RemoteSkeleton />}>
        <LazyRemoteComponent />
      </React.Suspense>
    </RemoteErrorBoundary>
  );
}
