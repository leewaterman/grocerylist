// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';

// Init App
var app = new Framework7({
  id: 'io.framework7.testapp',
  root: '#app',
  theme: theme,
  methods: {
    generateGroceryList: function (xml) {
      app.request({
        url: 'mgourmet4.xml',
        method: 'GET',
        dataType: 'XML',
        crossDomain: false,
        success: function (data, textStatus) {

           var html="";

           // convert the XML to JSON
           var parser = new DOMParser();
           var xml = parser.parseFromString(data, "text/xml");
           var obj = xmlToJson(xml);

           // grab the items 
           var gl = obj.plist[1].array.dict.array.dict;

           // initialize grocery object
           var groceries = {};
           for (var key in gl) {
              var aisle = gl[key].string[0]['#text']; if (!aisle) aisle = 'Not Specified';
              var category = gl[key].string[1]['#text']; if (!category) category = '';
              var description = gl[key].string[2]['#text']; if (!description) description = '';
              var name = gl[key].string[3]['#text']; if (!name) name = '';
              var price = gl[key].string[4]['#text']; if (!price) price = '';
              var quantity = gl[key].string[5]['#text']; if (!quantity) quantity = '';
              var store = gl[key].string[6]['#text']; if (!store) store = '';
              var units = gl[key].string[7]['#text']; if (!units) units = '';

              // build the list item string
              var item = name;
              if (quantity) item += ', '+quantity;
              if (units) item += ' '+units;
              if (description) item += ' ('+description+')';

              // initialize object
              if(store in groceries == false)
                groceries[store] = {}; 
                           
              // initialize array
              if (aisle in groceries[store] == false) 
                groceries[store][aisle] = [];

              // Add to array
              groceries[store][aisle].push(item);
           }

           // loop through the grocery object and build html
           for (var s in groceries) {
            html += '<div class="block-title">'+s+'</div><div class="list">';
            for (var a in groceries[s]) {
              html += '<ul><li>'+
              '<label class="item-checkbox item-content">'+
                '<div class="item-inner">'+
                  '<div class="item-title">'+a+'</div>'+
                '</div>'+
              '</label></li>';
              for (var i in groceries[s][a]) {
                html += '<li>' +
                          '<label class="item-checkbox item-content">' +
                          '<input type="checkbox" name="item_checkbox" value="'+groceries[s][a][i]+'">' +
                          '<i class="icon icon-checkbox"></i>' +
                          '<div class="item-inner">' +
                            '<div class="item-title">'+groceries[s][a][i]+'</div>' +
                          '</div>' +
                          '</label>' +
                          '</li>';
              }
              html += '</ul>';
            }              
            html += '</div>';
          }
          
          // write the html to the DOM
          document.getElementById("demo").innerHTML = html;               
        },
        error: function (xhr, textStatus, errorThrown) {
        },
      });
    },
  },
  routes: routes,
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


// Load the XML into the page
app.methods.generateGroceryList();