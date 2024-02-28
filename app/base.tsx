import Header from "./components/header";
import SideMenu from "./components/sidemenu";

export default function BasePage({ pageId, title, children, customHead }: { pageId: number, title?: string, children: React.ReactNode, customHead?: React.ReactNode }) {
    return (
        <main className="flex">
            <SideMenu current={pageId} />
            <div className="flex-grow">
                <Header />
                <div className="flex flex-col px-6 gap-7">
                    {title || customHead &&
                        <div>
                            {title && !customHead &&
                                <h1 className="title"
                                >{title}</h1>
                            }{
                                customHead && customHead
                            }
                        </div>
                    }
                    {children}
                </div>
            </div>
        </main>
    )
}