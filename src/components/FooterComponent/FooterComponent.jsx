import Link  from 'next/link'
import React from 'react'

const FooterComponent = () => {
    return (
      <>
      
            <div>
                {/* Footer Links (Light Gray Text) */}
            <div className="mt-8">
                <p className="text-xs text-gray-300 space-x-1">
                    <Link href="#" className="hover:underline">About</Link>
                    <span>&bull;</span>
                    <Link href="#" className="hover:underline">Help</Link>
                    <span>&bull;</span>
                    <Link href="#" className="hover:underline">Press</Link>
                    <span>&bull;</span>
                    <Link href="#" className="hover:underline">API</Link>
                    <span>&bull;</span>
                    <Link href="#" className="hover:underline">Jobs</Link>
                </p>
                <p className="text-xs text-gray-300 mt-4">
                    &copy; {new Date().getFullYear()} INSTAGRAM FROM META
                </p>
            </div>
      </div>
      </>
  )
}

export default FooterComponent