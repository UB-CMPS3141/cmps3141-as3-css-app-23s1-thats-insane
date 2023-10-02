/*
CMPS3141-HCI - AS3-23S1
Collaborators: Cahlil Tillett
Date: Sept.22.23
*/

import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp ({
	data: {
		expenses: [],
		neoOwes: 0,
		trinityOwes: 0,
		
		form: {
			title: "",
			purchaser: "",
			card: "",
			expenseType: "",
			currency: "BZD",
			amount: 0
		}
	},

	methods: {
		currencyConvert(from, to, amount) {
			const rates = {
				BZD: 1,
				MXN: 8.73,
				GTQ: 3.91
			};

			return amount * rates[to] / rates[from];
		},

		addExpense() {
			const expense = {
				purchaser: this.form.purchaser,
				card: this.form.card,
				currency: this.form.currency,
				formAmount: this.form.amount,
				title: this.form.title,
				neoOwes: 0,
				trinityOwes: 0,
			};
		
			this.expenses.push(expense);
		
			if (expense.expenseType === this.personal) {
				amount = this.currencyConvert(
					expense.currency,
					"BZD",
					expense.formAmount
				);
				
				if (expense.card === "Neo's Card" && expense.purchaser === "Trinity")
					expense.trinityOwes = amount;
			  	else if (expense.card === "Trinity's Card" && expense.purchaser === "Neo")
					expense.neoOwes = amount;
			} else if (expense.expenseType === "Joint" || expense.card === "Joint Card") {
				amount = this.currencyConvert(
					expense.currency,
					"BZD",
					expense.formAmount / 2
				);
				
				if (expense.card === "Neo's Card" || expense.purchaser === "Trinity")
					expense.trinityOwes = amount;
				else if (expense.card === "Trinity's Card"  && expense.purchaser === "Neo")
					expense.neoOwes = amount;
			}
		  
			this.form.purchaser = "";
			this.form.card = "";
			this.form.amount = 0;
			this.form.title = "";
			this.form.expenseType = "",
			this.form.currency = "BZD"
		  }
		  
	},

	computed: {
		total_balance () {
			let neoOwes = 0;
			let trinityOwes = 0;
		
			for (let expense of this.expenses) {
			  	neoOwes += expense.neoOwes;
			  	trinityOwes += expense.trinityOwes;
			}
		
			return {
			  	neoOwes,
			  	trinityOwes
			};
		}
	}
}, "#app");
