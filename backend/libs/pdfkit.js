import PDFDocument from "pdfkit-table";
import fs  from 'fs';
const size={
    width:595.28,
    height:841.89
  }
const calculateRowNumbers = (text, characterNum)=>{
    const line = Math.ceil(text.length/characterNum)
    return line;
}
const calculateHeight = (height, add)=>{
    height +=add;
    
    return height;
}
export function buildPDF(dataCallback, endCallback, cvData) {
  
    
  const doc = new PDFDocument({
    size:"A4",
    margin: 20,
    bufferPages: true,
    autoFirstPage: true,
    
    
  });
  
  
  const paddingRight = 20;
  const paddingLeft = 20;
  const gap = 20;
  const paddingTop=20;
  
    
  
  const {firstName, lastName, jobTitle, phone, country, city, email, 
    linkedIn, educationList,skills, description, experienceList, websiteLinks
  }= cvData
  //doc.pipe(fs.createWriteStream('/files/output.pdf'));
  let height = 0;
  height+=30
  let pageNumber = 1;
  const grey = "#777"
  const greyDark = "#555"
  const black="#000"
  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.on("pageAdded",()=>{
    //height+=30
    pageNumber=pageNumber+1;
  })
  
  doc.font('Times-Roman').lineGap(2).fontSize(20).text((firstName+" "+lastName)?.toUpperCase(), 0, height, {
    width: size.width, align:"center",
  });
  if(jobTitle){
    height+=25
    doc.font('Helvetica').fillColor(grey).lineGap(2).fontSize(12).text(`${jobTitle}`, 0, height, {
        width: size.width, align:"center",
      });
  }
  if(phone||email||linkedIn||country){
    height= calculateHeight(height, 15, doc)
    let lineText = `${phone} ${email?' | '+email:''}${linkedIn?' | '+linkedIn:''}${country?' | '+country:""}`
    doc.font('Helvetica').fillColor(greyDark).lineGap(2).fontSize(10).text(lineText, 0, height, {
        width: size.width, align:"center",
      });
  }
  if(description){
    const tableDescription = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: true, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Experience", property: 'name', align:"justify", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name:`${description}`,
        options:{  fontSize: 8, fontFamily: 'Courier-Bold'} 
      }],
      rows: [],
    };
    doc.table(tableDescription, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica"),
    });
  }
  
  const experienceDatas = [];
  
  if(experienceList.length>0){

    const tableExperienceHeader = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: false, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Experience", property: 'name', align:"center", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name:"Experience",
        options:{  fontSize: 12, fontFamily: 'Courier-Bold'} 
      }],
      rows: [],
    };
    doc.table(tableExperienceHeader, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica"),
    });
    
    let i = 0;
    for(i=0; i<experienceList.length; i++){
      
      let experience = experienceList[i]
        experienceDatas.push({  name: `bold:${experience.positionName}, ${experience.companyName}, ${experience.companyLocation}`, options:{  fontSize: 10, fontFamily: 'Courier-Bold'} })
        experienceDatas.push({ name: `bold:${experience.startDate}-${experience.endDate}`, options:{  fontSize: 10, fontFamily: 'Courier-Bold'} })
        experienceDatas.push({ name: `${experience.description}`, }, )
        experienceDatas.push({name:" "})
        
    }
  }

  
  const table2 = {
    options: {
      // divider lines
      divider: {
        header: {disabled: true, width: 0.5, opacity: 0.5},
        horizontal: {disabled: true, width: 0.5, opacity: 0.5},
      },
      hideHeader: true, 
    },
    headers: [
      { label:"Experience", property: 'name', align:"justify", width: size.width-paddingLeft-paddingRight, renderer: null },
    ],
    datas: experienceDatas,
    rows: [],
  };
  doc.table(table2, {
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
    prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
  });




  if(educationList.length>0){
    
    let i = 0;
    let educationData=[]
    const tableEducationHeader = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: false, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Education", property: 'name', align:"center", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name:`Education`,
        options:{
          fontSize: 30
        }
      }],
      rows: [],
    };
    doc.table(tableEducationHeader, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
    for(i=0; i<educationList.length; i++){
        
        let education = educationList[i]
        educationData.push({name:" "})
        educationData.push({  name: `bold:${education.university}, ${education.location}`, options:{  fontSize: 10, fontFamily: 'Courier-Bold'} })
        educationData.push({ name: `bold:${education.start}-${education.end}`, options:{  fontSize: 10, fontFamily: 'Courier-Bold'} })
        educationData.push({ name: `${education.major} ${education.degree}`, }, )
        
    }
    const table3 = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: true, width: 0.5, opacity: 0.5},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Experience", property: 'name', width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: educationData,
      rows: [],
    };
    doc.table(table3, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
  }

  if(skills.length>0){

    const tableskill = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: false, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Skills", property: 'name', align:"center", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name:"Skills",
        options:{
          fontSize: 30
        }
      }],
      rows: [],
    };
    doc.table(tableskill, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
    let skillString = "";
    for(let i = 0; i<skills.length; i++){
      skillString= skillString.concat(skills[i].name+", ");

    }
    const tableskillValue = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: true, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Skills", property: 'name', align:"center", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name: skillString,
        options:{
          fontSize: 30
        }
      }],
      rows: [],
    };
    doc.table(tableskillValue, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
  }

  if(websiteLinks.length>0){

    const tablewebsiteheader = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: false, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Skills", property: 'name', align:"center", width: size.width-paddingLeft-paddingRight, renderer: null },
      ],
      datas: [{
        name:"Contact",
        options:{
          fontSize: 30
        }
      }],
      rows: [],
    };
    doc.table(tablewebsiteheader, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
    let contactArray = [];
    for(let i = 0; i<websiteLinks.length; i++){
      contactArray.push({
        name: websiteLinks[i].name,
        name1:websiteLinks[i].link,
        options:{
          fontSize: 30
        }
      })
    }
    
    const tablecontactValue = {
      options: {
        // divider lines
        divider: {
          header: {disabled: true, width: 0.5, opacity: 0.5},
          horizontal: {disabled: true, width: 1, opacity: 1},
        },
        hideHeader: true, 
      },
      headers: [
        { label:"Skillswebste", property: 'name', align:"left", width: (size.width-paddingLeft-paddingRight)/3, renderer: null },
        { label:"Skills1", property: 'name1', align:"left", width: (size.width-paddingLeft-paddingRight)/3*2, renderer: null },
      ],
      datas: contactArray,
      rows: [],
    };
    doc.table(tablecontactValue, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow) => doc.font("Helvetica").fontSize(8),
    });
  }
  
  doc.end();
}

