'use client'
import KanbanLogo from '../../public/assets/kanban-logo.svg';
import Arrow from '../../public/assets/arrow-down.svg';
import Ellipses from '../../public/assets/ellipses.svg';
import useViewport from '@/utils/useViewport';

interface HeaderProps {
    theme: string | undefined;
    setTheme: (theme: string) => void
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
    const { width: viewportWidth }: { width: number } = useViewport();
    return (
        <header className='flex justify-between items-center h-16 p-4 bg-white md:h-20 md:p-6 md:border-b md:border-b-lightBlue desktop:h-24 dark:bg-darkGray dark:md:border-b-gray'>
            <div className='flex justify-between items-center gap-4'>
                {viewportWidth < 768 ? <KanbanLogo /> : null}
                <div className='flex justify-between items-center gap-2'>
                    <span className='text-header font-bold dark:text-white' onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}>Platform Launch</span>
                    {viewportWidth < 768 ? <Arrow /> : null}
                </div>
            </div>
            <div className='flex justify-between items-center gap-4'>
                <button className='border-none bg-purple rounded-2xl px-4 py-1 text-white text-[15px] font-semibold md:h-12 md:rounded-3xl '>+ {viewportWidth >= 768 ? 'Add New Task' : null}</button>
                <Ellipses />
            </div>
        </header>
    )
}

export default Header;
