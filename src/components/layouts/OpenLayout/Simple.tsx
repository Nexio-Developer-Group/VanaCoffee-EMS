import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import Logo from '@/components/template/Logo'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {


    return (
        <div className="min-h-[1024px]">
            <header className="bg-white z-50 sticky top-0 border-b border-gray-200 shadow-xs">
                <div className="mx-auto px-2 sm:px-10 py-4 flex items-center justify-between">
                    <Link to="/home">
                        <Logo logoWidth={120}/>
                    </Link>
                    <div className='flex items-center gap-10'>
                        <a href="#menu" className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>MENU</a>
                        <Link to="/offers"> <p className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>OFFERS</p></Link>
                        <a href='#about' className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>ABOUT</a>
                        <a href='#location' className='text-primary-text hidden sm:flex cusror-pointer font-bold font-spacing-wider'>LOCATION</a>
                        <div className='flex items-center gap-6'>

                        <Link to="/home">
                        <Button
                            variant="default"
                            className='rounded-full px-6 hidden sm:block'
                            size='sm'
                        >Sign in</Button>
                        </Link>
                        </div>

                    </div>
                </div>
            </header>
            <main>
                <div className='mx-auto'>

                {content}
                {
                    children
                        ? cloneElement(children as ReactElement, {
                            ...rest,
                        })
                        : null
                }
                </div>

            </main>
        </div>
    )
}

export default Simple