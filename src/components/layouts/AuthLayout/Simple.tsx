import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import heroImage from "@/assets/home/landing.jpg";

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {
    return (
        <div className="h-screen w-full bg-white dark:bg-gray-800">
            <div className="flex h-full w-full flex-col md:flex-row">
                
                {/* Left Side (Image) - hidden on mobile */}
                <div className="hidden md:block relative w-full md:w-[60%] h-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${heroImage})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary-deep"></div>
                    </div>
                </div>

                {/* Right Side (Content) - full width on mobile */}
                <div className="w-full md:w-[40%] h-full flex items-center justify-center bg-secondary p-4 sm:p-10">
                    <div className="w-full">
                        {content}
                        {children
                            ? cloneElement(children as ReactElement, {
                                  ...rest,
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Simple
