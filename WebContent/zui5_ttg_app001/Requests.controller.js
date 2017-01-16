jQuery.sap.require("sap.ui.core.util.Export");































































































































jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");































































































































var oDataResult;































































































































































































































































sap.ui.controller("zui5_ttg_app001.Requests", {































































































































































































































































  navBackwards  : function() {































































































































    sap.ui.getCore().getEventBus().publish("nav", "back");































































































































  },































































































































































































































































  navBack : function() {































































































































    sap.ui.getCore().getEventBus().publish(































































































































        "nav", 































































































































        "to", {































































































































          viewName: "zui5_ttg_app001.Main",































































































































          viewId: "Main"































































































































      });































































































































  },































































































































































































































































  initLoad  : function() {































































































































































































































































    var oBusyDialog = new sap.m.BusyDialog({ text : "Lütfen bekleyiniz" });































































































































































































































































    var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_AKILLI_KASA_SRV_01/", true).































































































































            attachRequestSent(function(){































































































































              oBusyDialog.open();































































































































            });































































































































































































































































    oModel.attachRequestCompleted(function(oData){































































































































      console.log(oData.getSource().getProperty("/"));































































































































      oDataResult = oData.getSource().getProperty("/");































































































































      oBusyDialog.close();































































































































    });































































































































































































































































    this.getView().setModel(oModel);































































































































































































































































    var sQueryString = "/taleplerimSet?search=" + sDealerID;































































































































































































































































    this.getView().byId("myRequestsTable").bindAggregation("items", sQueryString, new sap.m.ColumnListItem({































































































































      cells: [































































































































              new sap.m.ObjectIdentifier({ title : "{StokKodu}" }),































































































































              new sap.m.Text({ text : "{MalzemeTanimi}" }),































































































































              new sap.m.ObjectNumber({































































































































                number : "{Fiyat}",































































































































                unit   : "TL"































































































































              }),































































































































              new sap.m.Text({ text : "{GirisTarihi}" }),































































































































              new sap.m.Text({ text : "{OnayDurumu}" }),































































































































              new sap.m.Text({ text : "{RedNedeni}" }),































































































































              new sap.m.Text({ text : "{OnayRedTarihi}" }),































































































































              ]































































































































    }));































































































































  },































































































































































































































































/**































































































































* Called when a controller is instantiated and its View controls (if available) are already created.































































































































* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.































































































































* @memberOf zui5_ttg_app001.Requests































































































































*/































































































































  onInit: function() {































































































































    this.getView().addEventDelegate({































































































































      onBeforeShow : jQuery.proxy(function(evt) {































































































































































































































































        this.onBeforeShow(evt);































































































































































































































































        }, this) });































































































































  },































































































































































































































































  onBeforeShow  : function() {































































































































    this.initLoad();































































































































  },































































































































































































































































  exportToExcel : function(oEvent) {































































































































	  































































































































	  var j = 0;































































































































		































































































































	  var file = {































































































































				  worksheets: [[]], // worksheets has one empty worksheet (array)































































































































				  creator: 'sablon', created: new Date(),































































































































				  lastModifiedBy: '', modified: new Date(),































































































































				  activeWorksheet: 0































































































































				  }, w = file.worksheets[0];































































































































		































































































































	  w.name = "sheet-1";































































































































		































































































































	  w.push([]);































































































































		































































































































	  w[0].push("Stok Kodu(NMU)");































































































































	  w[0].push("Tanım");































































































































	  w[0].push("Fiyat");































































































































	  w[0].push("Birim");































































































































	  w[0].push("Giriş Tarihi");































































































































	  w[0].push("Onay Durumu");































































































































	  w[0].push("Red Nedeni");































































































































	  w[0].push("Onay/Red Tarihi");































































































































	  































































































































	  for (var i = 0; i < oData.results.length; i++) {































































































































			j = i + 1;































































































































			w.push([]);































































































































			w[j].push(oData.results[i].StokKodu);































































































































			w[j].push(oData.results[i].MalzemeTanimi);































































































































			w[j].push(oData.results[i].Fiyat);































































































































			w[j].push("TL");































































































































			w[j].push(oData.results[i].GirisTarihi);































































































































			w[j].push(oData.results[i].OnayDurumu);































































































































			w[j].push(oData.results[i].RedNedeni);































































































































			w[j].push(oData.results[i].OnayRedTarihi);































































































































		}































































































































	  































































































































	  	var excelFile = xlsx(file);































































































































		var link = document.createElement('a');































































































































		link.href = xlsx(file).href();































































































































		link.download = "Taleplerim.xlsx";































































































































		































































































































		document.body.appendChild(link);	    































































































































	    link.click();	    































































































































	    document.body.removeChild(link);































































































































































































































































/*    var oModel = new sap.ui.model.json.JSONModel();































































































































    var dataObj = {































































































































                 "oData" : oDataResult































































































































              };































































































































     oModel.setData(dataObj);































































































































































































































































    console.log(oDataResult);































































































































    console.log(oModel);































































































































































































































































       var oExport = new sap.ui.core.util.Export({































































































































          exportType  : new sap.ui.core.util.ExportTypeCSV({































































































































            separatorChar : ";"































































































































          }),































































































































































































































































          models    : oModel,































































































































          rows    : {































































































































            path : "/oData"































































































































          },































































































































          columns   : [{































































































































            name : "Stok Kodu(NMU)",































































































































            template: {































































































































              content: "{StokKodu}"































































































































            }































































































































          },{































































































































            name : "Tanım",































































































































            template: {































































































































              content: "{MalzemeTanimi}"































































































































             }































































































































          },{































































































































            name : "Fiyat",































































































































            template: {































































































































              content: "{Fiyat}"































































































































             }































































































































          },{































































































































            name : "Birim",































































































































            template: {































































































































              content: "TL"































































































































             }































































































































          },{































































































































            name : "Giriş Tarihi",































































































































            template: {































































































































              content: "{GirisTarihi}"































































































































             }































































































































          },{































































































































            name : "Onay Durumu",































































































































            template: {































































































































              content: "{OnayDurumu}"































































































































             }































































































































          },{































































































































            name : "Red Nedeni",































































































































            template: {































































































































              content: "{RedNedeni}"































































































































             }































































































































          },{































































































































            name : "OnayRedTarihi",































































































































            template: {































































































































              content: "{OnayRedTarihi}"































































































































             }































































































































          }]































































































































        });































































































































































































































































     oExport.saveFile(); */































































































































  },































































































































































































































































  showMessage : function(data) {































































































































































































































































    jQuery.sap.require("sap.m.MessageBox");































































































































































































































































    var oIcon, sTitle;































































































































































































































































    switch (data.TYPE) {































































































































    case "S": oIcon = sap.m.MessageBox.Icon.SUCCESS;   break;































































































































    case "I": oIcon = sap.m.MessageBox.Icon.INFORMATION; break;































































































































    case "E": oIcon = sap.m.MessageBox.Icon.ERROR;     break;































































































































    case "W": oIcon = sap.m.MessageBox.Icon.WARNING;   break;































































































































    default: break;































































































































    }































































































































































































































































      sap.m.MessageBox.show( data.MESSAGE, { icon   : oIcon,































































































































                           title  : sTitle,































































































































                                   actions  : [sap.m.MessageBox.Action.OK],































































































































                             });































































































































  },































































































































































































































































/**































































































































* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered































































































































* (NOT before the first rendering! onInit() is used for that one!).































































































































* @memberOf zui5_ttg_app001.Requests































































































































*/































































































































//  onBeforeRendering: function() {































































































































//































































































































//  },































































































































































































































































/**































































































































* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.































































































































* This hook is the same one that SAPUI5 controls get after being rendered.































































































































* @memberOf zui5_ttg_app001.Requests































































































































*/































































































































//  onAfterRendering: function() {































































































































//































































































































//  },































































































































































































































































/**































































































































* Called when the Controller is destroyed. Use this one to free resources and finalize activities.































































































































* @memberOf zui5_ttg_app001.Requests































































































































*/































































































































//  onExit: function() {































































































































//































































































































//  }































































































































































































































































});