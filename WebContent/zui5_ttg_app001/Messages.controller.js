sap.ui.controller("zui5_ttg_app001.Messages", {








































































































































































































	navBack	: function() {































































































































		sap.ui.getCore().getEventBus().publish(































































































































				"nav", 































































































































				"to", {































































































































				  viewName: "zui5_ttg_app001.Main",































































































































				  viewId: "Main"































































































































			});































































































































	},































































































































	































































































































/**































































































































* Set message as read































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































	setMessageRead	: function(oMessage) {































































































































		































































































































		var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_AKILLI_KASA_SRV_01/", true);































































































































		































































































































		var requestMessageHeader = {};































































































































		































































































































		requestMessageHeader.DealerId		 = sDealerID;































































































































		requestMessageHeader.Yayinlayan 	 = oMessage.getCells()[1].getText();































































































































		requestMessageHeader.YayinTarihi	 = oMessage.getCells()[3].getText();































































































































		requestMessageHeader.YayinSaati		 = oMessage.getCells()[4].getText();































































































































		requestMessageHeader.YayinlayanUname = oMessage.getCells()[5].getText();































































































































		requestMessageHeader.Mesaj1			 = oMessage.getCells()[0].getText();































































































































		requestMessageHeader.Mesaj2			 = oMessage.getCells()[8].getText();































































































































		requestMessageHeader.YayinlayanAd	 = oMessage.getCells()[6].getText();































































































































		requestMessageHeader.YayinlayanSoyad = oMessage.getCells()[7].getText();































































































































		requestMessageHeader.TarihText 		 = oMessage.getCells()[2].getText();































































































































		































































































































		oModel.setHeaders({































































































































  			"Access-Control-Allow-Origin" : "*",  































































































































  			"Content-Type": "application/x-www-form-urlencoded",  































































































































  			"X-CSRF-Token":"Fetch"































































































































  		 });  































































































































































































































































		var token;































































































































































































































































		oModel.read('/messageListSet',   































































































































					null,   































































































































					null,   































































































































					false,   































































































































					function(oData, oResponse) {  































































































































						token = oResponse.headers['x-csrf-token'];  































































































































					},  































































































































					function() {  































































































































						alert("Error on read process");  































































































































					}  































































































































				);































































































































































































































































		oModel.setHeaders({  































































































































  							"X-Requested-With": "XMLHttpRequest",































































































































  							"Content-Type": "application/json",































































































































  							"DataServiceVersion": "2.0",































































































































  							"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",































































































































  							"X-CSRF-Token": token































































































































  		  				});































































































































		































































































































		oModel.create('/messageListSet',   































































































































						requestMessageHeader,   































































































































		  				null,   































































































































		  				function(oData, oResponse) {},  































































































































		  				function() {}); 































































































































		































































































































		oMessage.setUnread(false);































































































































	},































































































































































































































































/**































































































































* Message table item select event































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































	onItemPress	: function(oEvent) {































































































































		var sMessage = oEvent.getSource().getCells()[8].getText();































































































































		var oTextArea = new sap.m.Text({ text : sMessage, editable : false });































































































































		var that = sap.ui.getCore().byId("Messages").getController();































































































































		































































































































		// set message read































































































































		if (oEvent.getSource().getCells()[9].getText() != "X")































































































































			that.setMessageRead(oEvent.getSource());































































































































		































































































































		// open dialog































































































































		if (!this.oDialog) {































































































































			this.oDialog = new sap.m.Dialog({































































































































				title		: "Mesaj metni",































































































































				rightButton	: new sap.m.Button({































































































































					text	: "Kapat",































































































































					icon 	: "sap-icon://decline",































































































































					press	: function(){ this.oParent.close(); }































































































































				}),































































































































				content: [ oTextArea ]































































































































				});































































































































		}































































































































		































































































































		this.oDialog.open();































































































































	},































































































































































































































































/**































































































































* Called when a controller is instantiated and its View controls (if available) are already created.































































































































* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































	onInit: function() {































































































































		































































































































		this.getView().addEventDelegate({































































































































			onBeforeShow : jQuery.proxy(function(evt) {































































































































				































































































































				this.onBeforeShow(evt);































































































































				































































































































				}, this) });































































































































	},































































































































	































































































































	initLoad	: function() {

		var that = this;

		var oList = this.getView().byId("myMessagesTable");

		var oBusyDialog = new sap.m.BusyDialog({ text : "Lütfen bekleyiniz" });

		var oFilter = [ new sap.ui.model.Filter("DealerId", sap.ui.model.FilterOperator.EQ, sDealerID) ];

		var bIsread;

		var mParameters = { async			: false,
							filters 	  	: oFilter,


							urlParameters 	: null,































































































































							success			: function(oData) {































































































































								































































































































								oList.removeAllItems();































































































































								































































































































								for (var i = 0; i < oData.results.length; i++) {































































































































									































































































































									oData.results[i].Isread == "X" ? bIsread = true : bIsread = false;































































































































									































































































































									oList.addItem(new sap.m.ColumnListItem({































































































































										type	: sap.m.ListType.Active,































































































































										press	: that.onItemPress,































































































































										unread	: !bIsread,































































































































										cells	: [































































































































										     	   new sap.m.ObjectIdentifier({ text: oData.results[i].Mesaj1 }),































































































































										     	   new sap.m.Text({ text: oData.results[i].Yayinlayan }),































































































































										     	   new sap.m.Text({ text: oData.results[i].TarihText }),































































































































										     	   new sap.m.Text({ text: oData.results[i].YayinTarihi }),































































































































										     	   new sap.m.Text({ text: oData.results[i].YayinSaati }),































































































































										     	   new sap.m.Text({ text: oData.results[i].YayinlayanUname }),































































































































										     	   new sap.m.Text({ text: oData.results[i].YayinlayanAd }),































































































































										     	   new sap.m.Text({ text: oData.results[i].YayinlayanSoyad }),































































































































										     	   new sap.m.Text({ text: oData.results[i].Mesaj2 }),































































































































										     	   new sap.m.Text({ text: oData.results[i].Isread })































































































































										     	  ]































































































































									}));































































































































								}































































































































































































































































								oBusyDialog.close();































































































































							},































































































































							error			: function() {































































































































								oBusyDialog.close();































































































































							}































































































































			  };































































































































		































































































































		var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_AKILLI_KASA_SRV_01/", false);































































































































		































































































































		oBusyDialog.open();































































































































		oModel.read("/messageListSet", mParameters);































































































































	},































































































































































































































































/**































































































































* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered































































































































* (NOT before the first rendering! onInit() is used for that one!).































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































//	onBeforeRendering: function() {































































































































//		































































































































//	},































































































































	































































































































	onBeforeShow	: function() {































































































































		this.initLoad();































































































































	}































































































































































































































































/**































































































































* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.































































































































* This hook is the same one that SAPUI5 controls get after being rendered.































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































//	onAfterRendering: function() {































































































































//		































































































































//	},































































































































































































































































/**































































































































* Called when the Controller is destroyed. Use this one to free resources and finalize activities.































































































































* @memberOf zui5_ttg_app001.Messages































































































































*/































































































































//	onExit: function() {































































































































//































































































































//	}































































































































































































































































});