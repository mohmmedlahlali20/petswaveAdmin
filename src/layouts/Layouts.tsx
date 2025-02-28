import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export default function DashboardLayouts() {
  return (

      <div className="flex min-h-screen ">
          <Sidebar />
          <div className="flex flex-col justify-between flex-grow  shadow-lg rounded-l-lg overflow-hidden ml-5">
              <main className="flex-grow p-6 md:p-8">
                  <Outlet />
              </main>
              {/* <Footer /> */}
          </div>
      </div>

  )
}
