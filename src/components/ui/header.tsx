import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react';
import { Card } from './card';
import { Button } from './button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet';

const Header = () => {
  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-start gap-2">
              <LogInIcon size={16} />
              Fazer Login
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              Inicio
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <ListOrderedIcon size={16} />
              Catalago
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1>
        <span className="text-primary font-bold">FSW</span> Store
      </h1>

      <Button>
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
