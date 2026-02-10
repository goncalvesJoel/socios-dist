sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input"
], function (Controller, Dialog, Button, Input) {
    "use strict";

    return Controller.extend("socios.controller.Main", {

        onInit: function () {
            const data = {
                items: [
                    { title: "Primeiro item" }
                ]
            };

            const oModel = new sap.ui.model.json.JSONModel(data);
            this.getView().setModel(oModel);
        },

        onAddItem: function () {
            const oModel = this.getView().getModel();
            const aItems = oModel.getProperty("/items");

            const dialog = new Dialog({
                title: "Novo item",
                content: new Input("inputItem", {
                    placeholder: "Insere um título"
                }),
                beginButton: new Button({
                    text: "Guardar",
                    press: () => {
                        const value = sap.ui.getCore().byId("inputItem").getValue();
                        if (value) {
                            aItems.push({ title: value });
                            oModel.setProperty("/items", aItems);
                        }
                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: "Cancelar",
                    press: () => dialog.close()
                }),
                afterClose: () => dialog.destroy()
            });

            dialog.open();
        }

    });
});
``