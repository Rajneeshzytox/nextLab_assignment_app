// Its very hard to write html again & again for explaininng project... yeah iam lazy.. so instead of manually changing front page.. it is better to just make a markdown file, store it online and just render it...
// learn from : some random blog post on medium or dev {i forgot}...

import React, { useEffect, useState } from 'react'

// Markdown Show React
import ReactMarkdown from 'react-markdown'

// github like markdown
import remarkGfm from 'remark-gfm' 

// css
import 'github-markdown-css/github-markdown.css'
import "../../styles/markdown2.css"

export default function MarkdownRenderer() {
  // markdwon links
  const ApiInfo  = "https://raw.githubusercontent.com/Rajneeshzytox/nextLab_assignment_app/refs/heads/main/ProjectDetails/api_docs.md"


// States: 
  const [markdown, setMarkdown] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fileUrl, stFileUrl] = useState(ApiInfo)

  // get mark down file from fileUrl on load
  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await fetch(fileUrl)
        if (res.ok) {
            const text = await res.text()
            setMarkdown(text)
        }
        else{
            alert("failed to get markdown file")
        }
      } 
      
    //   if err set err
      catch (err) {
        setError(err.message)
      }

    //   stop loading..
      finally {
        setLoading(false)
      }
    }

    // run fetching
    fetchMarkdown()
  }, [fileUrl])

//   If loading 
if (loading) {
    return <p>Loading Markdown, Btw How are you 👋...</p>
}

//   If err 
  if (error) {
    return <p>😔 Error: {error}</p>
  }

  return (
    <div className="markdown-content markdown-container">
      {/* show markdown */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}


