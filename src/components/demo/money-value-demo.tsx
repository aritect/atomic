import React, { type FC } from "react";

import { MoneyValue } from "@/components-ui-lib/money-value";

const MoneyValueDemo: FC = () => (
  <div>
    <h1 className="text-lg font-semibold mb-2">Fiat:</h1>
    <div className="grid grid-cols-3 gap-2 mb-8">
      <MoneyValue className="text-sm" type="fiat" value={12345678901234} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={1234567890123} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={123456789012} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={123456789} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={12345678} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={1234567} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={123456} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={12345} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={1234} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={123} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={12} sign="$" />
      <MoneyValue className="text-sm" type="fiat" value={1} sign="$" />
    </div>
    <h1 className="text-lg font-semibold mb-2">Crypto:</h1>
    <div className="grid grid-cols-3 gap-2">
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.00000001} />
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.0000001} />
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.000001} />
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.00001} />
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.0001} />
      <MoneyValue className="text-sm" type="crypto" sign="BTC" value={0.001} />
    </div>
  </div>
);

export { MoneyValueDemo };
