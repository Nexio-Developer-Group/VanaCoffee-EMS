import { cloneElement } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { CommonProps } from '@/@types/common'
import Logo from '@/components/template/Logo'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Book } from 'lucide-react'

interface SimpleProps extends CommonProps {
    content?: ReactNode
}

const Simple = ({ children, content, ...rest }: SimpleProps) => {


    return (
        <div className="min-h-[1024px]">

            <div className="fixed bottom-4 right-4 z-50">
                <Link to="/menu" className="">
                    <span className='flex items-center gap-2 text-sm font-medium bg-black p-2 px-4 rounded-4xl text-primary-deep dark:text-white'>
                        <Book className="w-4 h-4 text-secondary" />
                        <span className='text-secondary'>Menu</span>
                    </span>
                </Link>
            </div>

            <header className="bg-white z-50 sticky top-0 border-b border-gray-200 shadow-xs">
                <div className="mx-auto px-4 sm:px-10 py-4 flex items-center justify-between">
                    <Link to="/">
                        <Logo logoWidth={80} />
                    </Link>
                    <div className='flex items-center sm:gap-10'>
                        <Link to="/menu"><p className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>MENU</p></Link>
                        <Link to="/offers"> <p className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>OFFERS</p></Link>
                        <Link to="/about"><p className='text-primary-text hidden sm:flex  cusror-pointer font-bold font-spacing-wider'>ABOUT</p></Link>
                        <Link to="/location"><p className='text-primary-text hidden sm:flex cusror-pointer font-bold font-spacing-wider'>LOCATION</p></Link>
                        <div className='flex items-center gap-6'>

                            <Link to="/home">
                                <Button
                                    variant="default"
                                    className='rounded-full px-6 block'
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