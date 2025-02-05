import React, { useRef, useState } from "react";
import './points.css';

const KeyWord = ({keyword, onRemove}) => {
    return (
       <div className="point rounded border border-dark p-2 mx-2">
            {keyword} <button type="button" className="btn btn-outline-danger ms-2" onClick={() => onRemove(keyword)}>&times;</button>
       </div>    
    );
}

const PointForm = ({ onAdd }) => {
    
    const [keywords, setKeywords] = useState([]);
    // const [keyword, setKeyword] = useState("");
    const [section, setSection] = useState("experience");
    const contentRef = useRef(null);
    const [formattedHTML, setFormattedHTML] = useState("");
    const tagInputRef = useRef(null);

    const handleOnChange = (e) => {
        
        const div = document.createElement("div");
        div.innerHTML = contentRef.current.innerHTML;
    
        // Extract and clean keywords from <strong> and <b> elements
        let extractedKeywords = [];
        div.querySelectorAll("strong, b").forEach((el) => {
            let text = el.textContent.trim();
            
            // Split by ',' and 'and', trim each, and filter out empty values
            extractedKeywords.push(...text.split(/,|and/i).map(word => word.trim()).filter(Boolean));
        });
    
        // Remove all styles but keep <strong> and <b>
        div.querySelectorAll("*").forEach((el) => {
            if (!["STRONG", "B"].includes(el.tagName)) {
                el.outerHTML = el.innerHTML; // Remove element but keep its text
            }
        });
    
        // Remove empty spans, special symbols, and excessive spaces
        div.innerHTML = div.innerHTML.replace(/<span[^>]*>|<\/span>/g, ""); // Remove spans
        div.innerHTML = div.innerHTML.replace(/&nbsp;/g, " "); // Convert non-breaking spaces to normal space
        div.innerHTML = div.innerHTML.replace(/\s+/g, " ").trim(); // Normalize spaces
    
        setFormattedHTML(div.innerHTML);  // Update formatted HTML content
        setKeywords(extractedKeywords);  // Update keywords array
    };
    

    

    const handleAddKeyword = () => {
        const newKeyword = tagInputRef.current.value.trim();
        if (newKeyword && !keywords.includes(newKeyword)) {
            setKeywords([...keywords, newKeyword]);
            tagInputRef.current.value = "";
        }
    };

    const handleRemoveKeyword = (keywordToRemove) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };
    
  
    const handleSubmit = (e) => {
        
      e.preventDefault();
      if (!formattedHTML.trim()) return;


      onAdd({
        content: formattedHTML,
        keywords: keywords,
        section,
      });
      setFormattedHTML("");
      setKeywords([]);
      if (contentRef.current) contentRef.current.innerHTML = "";
    if (tagInputRef.current) tagInputRef.current.value = "";
      
    };
  
    return (
    <div className="pointForm">
        <form className="card m-3">
        <div className="form-group row m-3">
                <label htmlFor="contentInput" className="col-sm-2 col-form-label">Content</label>
                <div className="col-sm-10">
                    <div ref={contentRef} contentEditable className="form-control" id="contentInput" placeholder="Enter content" rows={3} style={{ minHeight: "100px", border: "1px solid #ccc", padding: "10px" }} onInput={handleOnChange} required></div>
                </div>
            </div>
            
            <div className="form-group row m-3">
                <label htmlFor="tagsInput" className="col-sm-2 col-form-label">Tags</label>
                <div className="col-sm-10 ">
                    <div className="input-group">
                        <input type="text" className="form-control" id="tagsInput" placeholder="Enter content" ref={tagInputRef}  required/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary addButton" type="button" onClick={handleAddKeyword}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group m-3 d-flex flex-wrap">
                {keywords.map((keyword) => (
                    <div key={keyword}>
                        <KeyWord  keyword={keyword} onRemove={handleRemoveKeyword} />
                    </div>
                )) }
            </div>
            {/* <div>
            <h3>Filtered HTML Output</h3>
            <div className="border p-3" dangerouslySetInnerHTML={{ __html: formattedHTML }}></div>
            <button type="button" className="btn btn-primary mt-3" onClick={handleCopy}>
                Copy to Clipboard
            </button>
            </div> */}

            <div className="form-group row m-3">
                <label className="col-sm-2 col-form-label">Section</label>
                <div className="col-sm-10 d-flex">
                    <div className="form-check me-3">
                        <input className="form-check-input" type="radio" name="section" id="summary" value="summary" checked={section === "summary"} onChange={(e) => setSection(e.target.value)} />
                        <label className="form-check-label" htmlFor="summary">Summary</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="section" id="experience" value="experience" checked={section === "experience"} onChange={(e) => setSection(e.target.value)} />
                        <label className="form-check-label" htmlFor="experience">Experience</label>
                    </div>
                </div>
            </div>
            
            <button type="button" className="btn btn-primary m-3" onClick={handleSubmit}>Add Point</button>
        </form>
    </div>
    );
};

export default PointForm;