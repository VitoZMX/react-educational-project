import React, {ComponentType} from 'react'

export const withSuspense =
    <P extends object>(Component: ComponentType<P>): React.FC<P> => {
        return (props: P) => {
            return (
                <React.Suspense fallback={<div>loading...</div>}>
                    <Component {...props} />
                </React.Suspense>
            )
        }
    }