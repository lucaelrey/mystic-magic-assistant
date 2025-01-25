import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price_per_unit: number;
}

interface OrderItemsTableProps {
  orderItems: OrderItem[];
  totalAmount: number;
}

export const OrderItemsTable = ({ orderItems, totalAmount }: OrderItemsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Artikel</TableHead>
          <TableHead>Menge</TableHead>
          <TableHead>Preis pro Stück</TableHead>
          <TableHead>Gesamtpreis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.product_name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>CHF {item.price_per_unit.toFixed(2)}</TableCell>
            <TableCell>
              CHF {(item.quantity * item.price_per_unit).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={3} className="text-right font-semibold">
            Gesamtbetrag:
          </TableCell>
          <TableCell className="font-semibold">
            CHF {totalAmount.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};