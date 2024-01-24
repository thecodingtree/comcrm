import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  EditButton,
  DeleteButton,
  ConfirmButton,
} from '@/components/controls/Buttons';

import { AddressType } from '@/server/sharedTypes';

interface EditAddressProps {
  label?: string | null;
  address?: AddressType;
  onChange?: (value?: AddressType) => void;
}

export default function EditAddress({
  label,
  address,
  onChange,
}: EditAddressProps) {
  const [isEditing, setIsEditing] = useState(false);

  // TODO: fix this
  const [street, setStreet] = useState(address?.street || '');
  const [city, setCity] = useState(address?.city || '');
  const [state, setState] = useState(address?.state || '');
  const [zip, setZip] = useState(address?.zip || '');

  const handleApply = () => {
    setIsEditing(!isEditing);
    const newAddress = {
      street,
      city,
      state,
      zip,
    } as AddressType;

    if (onChange && newAddress !== address) {
      onChange(newAddress);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-start gap-4">
        <p className="text-base text-slate-400">{label}</p>

        {!isEditing && <EditButton onClick={() => setIsEditing(!isEditing)} />}
      </div>
      {!isEditing ? (
        <div className="flex flex-col gap-1">
          <p className="italic">{street}</p>
          <p className="italic">{`${city} ${state} ${zip}`}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Label htmlFor="street">street</Label>
          <Input
            id="street"
            defaultValue={street}
            onChange={(e) => setStreet(e.currentTarget.value)}
          />
          <Label htmlFor="city">city</Label>
          <Input
            id="city"
            defaultValue={city}
            onChange={(e) => setCity(e.currentTarget.value)}
          />
          <Label htmlFor="state">state</Label>
          <Input
            id="state"
            defaultValue={state}
            onChange={(e) => setState(e.currentTarget.value)}
          />
          <Label htmlFor="zip">zip</Label>
          <Input
            id="zip"
            defaultValue={zip}
            onChange={(e) => setZip(e.currentTarget.value)}
          />
          <div>
            <ConfirmButton onClick={() => handleApply()} />
            <DeleteButton onClick={() => setIsEditing(!isEditing)} />
          </div>
        </div>
      )}
    </div>
  );
}
