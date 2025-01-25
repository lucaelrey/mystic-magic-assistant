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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Artikel</TableHead>
            <TableHead className="text-right">Menge</TableHead>
            <TableHead className="text-right">Preis pro Stück</TableHead>
            <TableHead className="text-right">Gesamtpreis</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.product_name}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">CHF {item.price_per_unit.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                CHF {(item.quantity * item.price_per_unit).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} className="text-right font-semibold">
              Gesamtbetrag:
            </TableCell>
            <TableCell className="text-right font-semibold">
              CHF {totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};