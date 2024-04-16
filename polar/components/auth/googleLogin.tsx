'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/registry/new-york/ui/button'
import { IconGoogle, IconSpinner } from '@/registry/new-york/ui/icons'

interface LoginButtonProps extends ButtonProps {
    showGoogleIcon?: boolean
    text?: string
}

export function LoginButtonGoogle({
    text = 'Login with Google',
    showGoogleIcon = true,
    className,
    ...props
}: LoginButtonProps) {
    const [isLoading, setIsLoading] = React.useState(false)
    // Create a Supabase client configured to use cookies
    const supabase = createClientComponentClient()

    if (process.env.NEXT_PUBLIC_AUTH_GOOGLE !== 'true') {
        return null
    }

    return (


        <button className="btn btn-square btn-outline mx-2" onClick={async () => {
            setIsLoading(true)
            await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${location.origin}/auth/callback`, 
                queryParams: {
                  access_type: 'offline',
                  prompt: 'consent',
                },
              }
            })
          }}
          disabled={isLoading}>
            {isLoading ? (<IconSpinner className="mr-2 animate-spin" />
            ) : showGoogleIcon ? (
                <IconGoogle />
            ) : null}
        </button>






    )
}
