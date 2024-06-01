"use strict";

/*

   Author: Laura Coombs
   Date:   June 1, 2024

   Filename: bc_keys.js

   Functions
   =========

   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.

   makeKeyStyles()
      Create an embedded style sheet for the keyword box.


   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the "_" character.

*/

// on load findKeyWords, makeKeyStyles
window.addEventListener("load", findKeyWords);
window.addEventListener("load", makeKeyStyles);


function findKeyWords() {
  // 5. Create an aside element with the ID “keywords” and containing an h1 heading with the text “Keyword List”.
  var articleElement = document.getElementById("doc");
  var h2 = document.getElementsByTagName("h1")[0];

  // Create aside element and set attributes and text
  var asideElement = document.createElement("aside");
  asideElement.setAttribute("id", "keywords")

  // create contianing h1 element
  var h1Element = document.createElement("h1");
  var h1Text = document.createTextNode("Keyword List");

  // append h1 text to article element
  h1Element.appendChild(h1Text);
  asideElement.appendChild(h1Element);
  articleElement.insertBefore(asideElement, h2);

  // 6. Create an ol element and append it to the keywords aside element.
  var orderedListElement = document.createElement("ol");
  asideElement.appendChild(orderedListElement);

  // 7. Next, generate the list of keywords and add IDs to each keyword entry in the source article. Create an object collection named keyWordElems referencing all dfn elements within the doc article (Hint: Use the querySelectorAll() method.) Create an array named keyWords with a length equal to the length of the keyWordElems collection. Add a for loop that loops through all the items in the keyWordElems object collection, and for each item do the following:
  var keyWordElems = document.querySelectorAll("dfn");
  var keyWords = [];

  // create sorted array of words I can easily use to create a list
  for (var i = 0; i < keyWordElems.length; i++) {
    keyWords.push(keyWordElems[i].textContent);
  }

  // ABC the list
  keyWords.sort();

  // add ids to all keywords in the article
  keyWordElems.forEach((elem) => {
    elem.setAttribute("id", "keyword_" + replaceWS(elem.textContent));
  });

  // create list items and add to the ordered list
  for (var i = 0; i < keyWords.length; i++) {
    var listItemElement = document.createElement("li");
    var keyWordLink = document.createElement("a");
    keyWordLink.innerHTML = keyWords[i];

    keyWordLink.setAttribute("href", "#keyword_" + replaceWS(keyWords[i]));
    listItemElement.appendChild(keyWordLink);
    orderedListElement.appendChild(listItemElement);
  }
}


function makeKeyStyles() {
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "aside#keywords { " +
    "border: 3px solid rgb(101,101,101);" +
    "float: right;" +
    "margin: 20px 0px 20px 20px;" +
    "padding: 10px;" +
    "width: 320px;" +
    "}"
    , 0
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "aside#keywords h1 { " +
    "font-size: 2em;" +
    "margin: 5px;" +
    "text-align: center;" +
    "}"
    , 1
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "aside#keywords ol { " +
    "font-size: 1.2em;" +
    "margin-left: 20px;" +
    "}"
    , 2
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "aside#keywords ol li { " +
    "line-height: 1.5em;" +
    "}"
    , 3
  );
  document.styleSheets[document.styleSheets.length - 1].insertRule(
    "aside#keywords ol li a { " +
    "color: rgb(101,101,101);" +
    "text-decoration: none;" +
    "}"
    , 4
  );
}




/*Supplied Functions*/

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
