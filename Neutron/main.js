// This code sucks because it's thrown together for proof of concept for the BoilerPlateRelease
// Will jurastically improve quality by Pre-Release

function removeLastChar(s) {
    return (s.length == 0) ? "" : (s.substring(0, s.length - 1));
}

function LoadModules() {
    let script = document.createElement('script')
    let prior = document.getElementsByTagName('script')[0]
    script.async = 1

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null
            script = undefined

            let styles = "@import url('https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/androidstudio.css');"
            let newSS = document.createElement('link')
            newSS.rel = 'stylesheet'
            newSS.href = 'data:text/css,'+escape(styles)
            document.getElementsByTagName("head")[0].appendChild(newSS)

            if(!isAbort && main) setTimeout(main, 0)
        }
    };

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"
    prior.parentNode.insertBefore(script, prior)
}

function main() {
    let DcgExpressionList = document.querySelector(".dcg-expressionlist")
    DcgExpressionList.id = "DcgExpressionList"
    DcgExpressionList.innerHTML = ''
    
    let CodeDisplay = document.createElement("pre", {})
    
    DcgExpressionList.appendChild(CodeDisplay)
    
    let SavedCode = ''
    
    CodeDisplay.innerHTML = '<code>'+SavedCode+'</code>' // wrap content of pre tag in code tag
    hljs.highlightAll() // apply highlighting
    
    document.addEventListener('keydown', (Event) => {
        let AppendKey = true
        switch (Event.key) {
            case ("Enter") : {
                SavedCode += "\n"
                AppendKey = false
                break
            }
        
            case ("Backspace") : {
                SavedCode = removeLastChar(SavedCode)
                AppendKey = false
                break
            }
        
            case ("Shift") : {
                AppendKey = false
                break
            }

            case ("Tab") : {
                SavedCode += "\t"
                AppendKey = false
                break
            }
        }
        if (AppendKey) {SavedCode += Event.key}
        CodeDisplay.innerHTML = '<code>'+SavedCode+'</code>'
        hljs.highlightAll()
    })
}

LoadModules()
