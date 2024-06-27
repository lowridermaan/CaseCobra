import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import StatusDropdown from "./StatusDropdown";

async function Page() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  //   получаем все оплаченные заказы отсортированные по убыванию
  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      ShippingAdress: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastMonth = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 500;
  const MONTH_GOAL = 2500;

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last week</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    of {formatPrice(WEEKLY_GOAL)} goal
                  </p>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last month</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastMonth._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    of {formatPrice(MONTH_GOAL)} goal
                  </p>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={((lastMonth._sum.amount ?? 0) * 100) / MONTH_GOAL}
                  />
                </CardFooter>
              </Card>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Incoming orders
            </h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Puchase date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">
                        {order.ShippingAdress?.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <StatusDropdown
                        id={order.id}
                        orderStatus={order.status}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
