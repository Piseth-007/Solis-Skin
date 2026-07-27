import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateInvoice(order) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(225, 29, 72); // Rose
  doc.text("SOLIS SKIN", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);

  doc.text(`Invoice #${order.id}`, 14, 30);
  doc.text(`Date: ${order.date}`, 14, 37);
  doc.text(`Status: ${order.status}`, 14, 44);

  // Customer
  doc.setFontSize(14);
  doc.setTextColor(0);

  doc.text("Customer", 14, 58);

  doc.setFontSize(11);

  doc.text("Leang Piseth", 14, 66);
  doc.text("Street 271", 14, 73);
  doc.text("Phnom Penh, Cambodia", 14, 80);

  // Table
  autoTable(doc, {
    startY: 90,
    head: [["Product", "Qty", "Price", "Total"]],
    body: order.items.map((item) => [
      item.name,
      item.qty,
      `$${item.price.toFixed(2)}`,
      `$${(item.qty * item.price).toFixed(2)}`,
    ]),
  });

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0,
  );

  const shipping = 0;
  const tax = 2;
  const total = subtotal + shipping + tax;

  let y = doc.lastAutoTable.finalY + 15;

  doc.setFontSize(12);

  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, y);

  y += 8;

  doc.text(`Shipping: Free`, 140, y);

  y += 8;

  doc.text(`Tax: $${tax.toFixed(2)}`, 140, y);

  y += 12;

  doc.setFontSize(15);

  doc.text(`Total: $${total.toFixed(2)}`, 140, y);

  y += 20;

  doc.setFontSize(11);

  doc.setTextColor(120);

  doc.text("Thank you for shopping with Solis Skin ❤️", 14, y);

  doc.save(`Invoice-${order.id}.pdf`);
}
