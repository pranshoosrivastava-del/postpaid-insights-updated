# How to test Paytm LAN → Customer 360 redirect

**App must be run from this folder:** `postpaid-insights-updated`  
Run: `npm run dev` then open the URL shown (e.g. http://localhost:3000 or 3001, 3002).

---

## Easiest path (one click to a table with links)

1. In the **left sidebar**, click **Finance & Recon**.
2. Click the **Repayment Snapshot** tab.
3. Click any of the **6 KPI cards** (e.g. **Total Bill Amount** or **Customers Paid Full**).
   - You’ll land on a drill-down table.
4. In the **first column (Paytm LAN)**, click any **blue underlined** value (e.g. `PTM_RP_1001`).
5. You should be taken to **Customer 360** with that LAN in the URL and the profile loaded.

---

## Other tables where Paytm LAN is clickable

| Where to go first | How to get to the drill-down | Then click |
|-------------------|------------------------------|------------|
| **Bill Gen Recon** | Finance & Recon → Bill Gen Recon tab → click a **red non-zero Difference** in the table | Any blue **Paytm LAN** in the drill-down table |
| **Daily Dues Recon** | Finance & Recon → Daily Dues Recon tab → expand a row → click a **red Delta** for a component | Any blue **Paytm LAN** in the drill-down table |
| **MOM Lender Billing** | Finance & Recon → MOM Lender Billing tab → click a **red Variance** in the table | Any blue **Paytm LAN** in the drill-down table |
| **Repayment Snapshot** | Finance & Recon → Repayment Snapshot tab → click any **KPI card** | Any blue **Paytm LAN** in the first column |
| **Repayment Delta** | Finance & Recon → Repayment Snapshot tab → click **Unreconciled Repayments (Delta)** card | Any blue **Paytm LAN** in the drill-down table |
| **DPD Recon** | Left sidebar → **DPD Recon** → click a **red Delta** (non-zero) in the table | Any blue **Paytm LAN** in the drill-down table |

---

## Direct URL test

If clicking the LAN doesn’t change the page, try opening this in the same browser:

**http://localhost:3000/pp-insights/customer-360/PTM_LN_2025_771001**

(Replace 3000 with your dev server port if different.)

- If this URL **shows Customer 360** with that LAN, routing is fine and the issue is with the **Link** click.
- If this URL **doesn’t** show Customer 360, the app or base URL may be different (e.g. you’re running another project like `paytm-dashboard` instead of `postpaid-insights-updated`).
