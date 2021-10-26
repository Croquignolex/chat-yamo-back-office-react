import React from "react"

const FullPageLayout = ({ children }) => {
  return (
    <div
      className="full-layout wrapper bg-full-screen-image blank-page dark-layout layout-dark">
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container">
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPageLayout
