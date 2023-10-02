/*
CMPS3141-HCI - AS3-23S1
Collaborators: Cahlil Tillett
Date: Sept.22.23
*/

import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp({
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
		/**
		 * Currency convert function stub.
		 * In a real app, you would use an API to get the latest exchange rates,
		 * and we'd need to support all currency codes, not just MXN, BZD and GTQ.
		 * However, for the purposes of this assignment lets just assume they travel near by so this is fine.
		 * @param {"MXN" | "BZD" | "GTQ"} from - Currency code to convert from
		 * @param {"MXN" | "BZD" | "GTQ"} to - Currency code to convert to
		 * @param {number} amount - Amount to convert
		 * @returns {number} Converted amount
		 */
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
				
				if (expense.card === this.neoCard && expense.purchaser === this.trinity) {
					expense.trinityOwes = amount;
					this.trinityOwes += expense.trinityOwes;
			  	} else if (expense.card === this.trinityCard && expense.purchaser === this.neo) {
					expense.neoOwes = amount;
					this.neoOwes += expense.neoOwes;
			  	}
			} else if (expense.expenseType === this.joint) {
				amount = this.currencyConvert(
					expense.currency,
					"BZD",
					expense.formAmount / 2
				);
				
				if (expense.card === this.neoCard) {
					expense.trinityOwes = amount;
					this.trinityOwes += expense.trinityOwes;
				} else if (expense.card === this.trinityCard) {
					expense.neoOwes = amount;
					this.neoOwes += expense.neoOwes;
				}
			}
		  
			// Clear the form fields
			this.form.purchaser = "";
			this.form.card = "";
			this.form.amount = 0;
			this.form.title = "";
			this.form.expenseType = "",
			this.form.currency = "BZD"
		  }
		  
	},

	computed: {
		total_balance () { /*
			let total = 0;

			for (let expense of this.expenses) {
				let trinity_paid = expense.trinity_paid ?? 0;
				let neo_paid = expense.neo_paid ?? 0;
				let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
				let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

				total += (trinity_paid - neo_paid)/2 + trinity_paid_for_neo - neo_paid_for_trinity;
			}

			return total; */
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
