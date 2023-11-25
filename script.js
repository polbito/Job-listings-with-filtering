function AddJobs(company,contract,featured,id,languages,level,location,logo,is_new,position,postedAt,role,tools) {

    let container = document.querySelector(".container");
    let job_div = document.createElement("div");
    
    job_div.classList.add("job","rounded-1","p-3","mb-md-4","mb-5");

    if (featured) {
        job_div.setAttribute('data-featured', 'true');
    }

    let row_div = document.createElement("div");
    row_div.classList.add("row","align-items-center","position-relative");
    job_div.append(row_div);

    let col_1 = document.createElement("div");
    col_1.classList.add("col-2","profile_image");
    let profile_image = document.createElement("img");
    profile_image.src = logo;
    profile_image.alt = "photosnap image";
    profile_image.classList.add("img-fluid");
    col_1.append(profile_image);

    let col_2 = document.createElement("div");
    col_2.classList.add("col-lg-5","col-md-10","col-sm-12");
    let job_description = document.createElement("div");
    job_description.classList.add("job-description");
    col_2.append(job_description);
    let description_top = document.createElement("div");
    description_top.classList.add("top");
    job_description.append(description_top);
    let span_top_1 = document.createElement("span");
    span_top_1.innerText = company;
    span_top_1.classList.add("company");
    description_top.append(span_top_1);
    if (is_new) {
        let span_top_2 = document.createElement("span");
        span_top_2.innerText = "New!";
        span_top_2.classList.add("new","ms-3","me-1","rounded-5");
        description_top.append(span_top_2);
    }
    if (featured) {
        let span_top_3 = document.createElement("span");
        span_top_3.innerText = "FEATURED";
        span_top_3.classList.add("featured","rounded-5");
        description_top.append(span_top_3);
    }
    
    let description_mid = document.createElement("div");
    description_mid.classList.add("mid");
    let job_title = document.createElement("p");
    job_title.classList.add("job-title");
    job_title.innerText = position;
    description_mid.append(job_title);
    job_description.append(description_mid);


    let description_bottom = document.createElement("div");
    description_bottom.classList.add("bottom");
    let span_bottom_1 = document.createElement("span");
    span_bottom_1.innerText = postedAt;
    let span_bottom_2 = document.createElement("span");
    span_bottom_2.classList.add("seprator");
    span_bottom_2.innerText = "·";
    let span_bottom_3 = document.createElement("span");
    span_bottom_3.innerText = contract;
    let span_bottom_4 = document.createElement("span");
    span_bottom_4.classList.add("seprator");
    span_bottom_4.innerText = "·";
    let span_bottom_5 = document.createElement("span");
    span_bottom_5.innerText = location;

    description_bottom.append(span_bottom_1);
    description_bottom.append(span_bottom_2);
    description_bottom.append(span_bottom_3);
    description_bottom.append(span_bottom_4);
    description_bottom.append(span_bottom_5);
    job_description.append(description_bottom);


    let col_3 = document.createElement("div");
    col_3.classList.add("col-lg-5","col-md-12","col-sm-12");
    
    let skills = document.createElement("div");
    skills.classList.add("skills","d-flex","justify-content-lg-end","justify-content-md-start","mt-4","mt-lg-0","flex-lg-nowrap","flex-wrap");
    col_3.append(skills);

    let skills_p1 = document.createElement("p");
    skills_p1.classList.add("Role","lt");
    skills_p1.innerText = role;
    let skills_p2 = document.createElement("p");
    skills_p2.classList.add("level","lt");
    skills_p2.innerText = level;
    skills.append(skills_p1);
    skills.append(skills_p2);

    for(let i=0;i<tools.length;i++){
        let skills_tools_p = document.createElement("p");
        skills_tools_p.classList.add("tools","lt");
        skills_tools_p.innerText = tools[i];
        skills.append(skills_tools_p);
    }
    for(let i=0;i<languages.length;i++){
        let languages_tools_p = document.createElement("p");
        languages_tools_p.classList.add("languages","lt");
        languages_tools_p.innerText = languages[i];
        skills.append(languages_tools_p);
    }


    row_div.append(col_1);
    row_div.append(col_2);
    row_div.append(col_3);

    container.append(job_div);
}



function MakeFilterBar() {
    let container = document.querySelector(".container");
    let filter_bar = document.createElement("div")
    filter_bar.classList.add("filter_bar","rounded-1","p-3","mb-4","d-flex","align-items-center","justify-content-between");
    container.append(filter_bar);


    let div_1 = document.createElement("div");
    div_1.classList.add("d-flex","align-items-center");
    filter_bar.append(div_1);
    let div_2 = document.createElement("div");
    let clear = document.createElement("a");
    clear.href = "#";
    clear.classList.add("clear_selected")
    clear.innerText = "Clear";
    div_2.append(clear)
    filter_bar.append(div_2);
}

function AddSelected(select_content) {
    
    let selected_container = document.querySelector(".filter_bar div:first-child");
    selected_container.classList.add("flex-wrap","row-gap-3");
    let div = document.createElement("div");
    
    div.classList.add("d-flex","align-items-center","me-3");
    let span_1 = document.createElement("span");
    span_1.classList.add("selected");
    span_1.innerText = select_content;

    let span_2 = document.createElement("img");
    span_2.classList.add("remove_icon_container");
    span_2.src = "images/icon-remove.svg"; 
    span_2.alt = "remove icon";


    div.append(span_1);
    div.append(span_2);
    selected_container.append(div);
}



async function GetJobs(){
    try {
        let data = await fetch("data.json");
        data = await data.json();
        let keys = ["company","contract","featured","id","languages","level","location","logo","new","position","postedAt","role","tools"];
        for (let i=0; i<data.length;i++) {
            AddJobs(data[i]["company"],data[i]["contract"],data[i]["featured"],data[i]["id"],data[i]["languages"],data[i]["level"],data[i]["location"],data[i]["logo"],data[i]["new"],data[i]["position"],data[i]["postedAt"],data[i]["role"],data[i]["tools"]);
            document.querySelector(".job").classList.add("mt-md-0","mt-5");
        }

        const lt = document.querySelectorAll(".lt");
        let first_time = true;
        let selected_items = [];
        lt.forEach((el) => {
            el.addEventListener("click",(e) => {

                if (first_time) {
                    MakeFilterBar();
                    first_time = !first_time;
                }else {
                    document.querySelector(".filter_bar").style.cssText = "display: flex !important;";
                }
                DynamicSearchWidth()
                window.addEventListener('resize', DynamicSearchWidth);

                if (selected_items.includes(e.target.innerText) === false) {
                    AddSelected(e.target.innerText);
                    selected_items.push(e.target.innerText);  
                    
                }
                const remove_icon_container = document.querySelectorAll(".remove_icon_container");
                remove_icon_container.forEach((v) => {
                    v.addEventListener("click",(e) => {
                        elementToRemove = e.target.previousSibling.innerText;
                        selected_items = selected_items.filter(item => item !== elementToRemove);
                        e.target.parentElement.remove();
                        
                        if (document.querySelector(".filter_bar div:first-child").children.length === 0) {
                            document.querySelectorAll(".skills").forEach((value) => {
                                value.parentElement.parentElement.parentElement.classList.remove('hide');
                                document.querySelector(".filter_bar").style.cssText = "display: none !important;";
                                
                            })
                        }else {
                            document.querySelectorAll(".skills").forEach((value) => {
                                value.parentElement.parentElement.parentElement.classList.remove('hide');
                                if (FilterJobs(value,selected_items) === false) {
                                    value.parentElement.parentElement.parentElement.classList.add('hide');
                                }
                            })

                        }    
                    }) 
                })

                const clear_selected = document.querySelector(".clear_selected");
                clear_selected.addEventListener("click",() => {
                    let filter_bar = document.querySelector(".filter_bar");
                    let selected_container = document.querySelector(".filter_bar div:first-child");
                    selected_container.innerHTML = "";
                    filter_bar.style.cssText = "display: none !important";
                    location.reload();
                })

                document.querySelectorAll(".skills").forEach((value) => {
                    if (FilterJobs(value,selected_items) === false) {
                        value.parentElement.parentElement.parentElement.classList.add('hide');
                    }
                })


            })
        })
    }catch (error) {
        console.error(error);
    }
}

GetJobs();


function DynamicSearchWidth() {
    const filter_bar = document.querySelector(".filter_bar");
    const job = document.querySelector(".job");
    filter_bar.style.width = window.getComputedStyle(job).width;
}


function FilterJobs(skills,filter_content) {
    let arr = [];
    for (let i=0;i<skills.children.length;i++) {
        arr.push(skills.children[i].innerText);
        if (i === skills.children.length-1) {
            // console.log(arr);
            // console.log(filter_content);
            const check = filter_content.every(element => arr.includes(element));
            return check;
        }
    }
}