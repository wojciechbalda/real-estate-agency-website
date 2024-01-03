"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Slider,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { MAX_PRICE, MAX_SQUARE_FOOTAGE, MIN_PRICE, MIN_SQUARE_FOOTAGE } from "../variables/variables";

type State = {
  minPrice: string,
  maxPrice: string,
  minSquareFootage: string,
  maxSquareFootage: string,
  location: string,
  transaction: string,
}

type SetPrice = {
  type: 'setPrice',
  payload: number[]
}

type SetSquareFootage = {
  type: 'setSquareFootage',
  payload: number[]
}

type SetLocation = {
  type: 'setLocation',
  payload: string
}

type SetTransaction = {
  type: 'setTransaction',
  payload: string
}

type AppActions = SetPrice | SetSquareFootage | SetLocation | SetTransaction

const reducer = (state: State, action: AppActions) => {
  switch (action.type)
  {
    case "setLocation": {
      return {
        ...state,
        location: action.payload
      }
    }
    case "setPrice": {
      return {
        ...state,
        minPrice: action.payload[0].toString(),
        maxPrice: action.payload[1].toString(),
      }
    }
    case "setSquareFootage": {
      return {
        ...state,
        minSquareFootage: action.payload[0].toString(),
        maxSquareFootage: action.payload[1].toString()
      }
    }
    case "setTransaction": {
      return {
        ...state,
        transaction: action.payload
      }
    }
  }
};



const initialState: State = {
  minPrice: MIN_PRICE.toString(),
  maxPrice: MAX_PRICE.toString(),
  minSquareFootage: MIN_SQUARE_FOOTAGE.toString(),
  maxSquareFootage: MAX_SQUARE_FOOTAGE.toString(),
  location: '',
  transaction: "both",
}

const RealEstateSearchForm = ({districts}: {districts: string[]}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchParams = Object.fromEntries(searchParams.entries())
  const [state, dispatch] = useReducer(reducer, {...initialState, ...initialSearchParams})

  const handleClose = (propertiesAndValues: {propertyName: keyof State, value: string}[]) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.delete("page");

    const previousUrl = `${pathname}?${urlSearchParams.toString()}`

    propertiesAndValues.forEach(propertyAndValue => {
      if (initialState[propertyAndValue.propertyName] === propertyAndValue.value || !propertyAndValue.value)
        urlSearchParams.delete(propertyAndValue.propertyName)
      else 
        urlSearchParams.set(propertyAndValue.propertyName, propertyAndValue.value)
    })

    const currentUrl = `${pathname}?${urlSearchParams.toString()}`
    
    if (previousUrl !== currentUrl)
      router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <div className="justify-center flex-wrap flex gap-3">
      <Popover shouldBlockScroll onClose={() => handleClose([{propertyName: "minPrice", value: state.minPrice}, {propertyName: "maxPrice", value: state.maxPrice}])} placement="bottom" color="default">
        <PopoverTrigger>
          <Button color="primary" variant="shadow">
            Price
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px]">
          <Slider
            label="Price"
            step={1000}
            minValue={MIN_PRICE}
            maxValue={MAX_PRICE}
            value={[+state.minPrice, +state.maxPrice]}
            onChange={(value) => { 
              dispatch({type: "setPrice", payload: value as number[]})
            }}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
            showTooltip
            name="price"
          />
        </PopoverContent>
      </Popover>
      <Popover shouldBlockScroll onClose={() => handleClose([{propertyName: "transaction", value: state.transaction}])} placement="bottom" color="default">
        <PopoverTrigger>
          <Button color="primary" variant="shadow">
            Transaction
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          <RadioGroup
            label="Select transaction"
            onValueChange={(value) => dispatch({type: "setTransaction", payload: value})}
            value={state.transaction}
          >
            <Radio value="both">Both</Radio>
            <Radio value="sale">Sale</Radio>
            <Radio value="rent">Rent</Radio>
          </RadioGroup>
        </PopoverContent>
      </Popover>
      <Popover shouldBlockScroll placement="bottom" color="default" onClose={() => handleClose([{propertyName: "location", value: state.location}])}>
        <PopoverTrigger>
          <Button color="primary" variant="shadow">
            Location
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          <Select
            selectedKeys={state.location === "" ? [] : state.location.split(',')}
            onChange={(e) => {
                   dispatch({type: "setLocation", payload: e.target.value})
              }}
            label="Location"
            selectionMode="multiple"
          >
            {districts.map(district => <SelectItem key={district}>{district}</SelectItem>)}
          </Select>
        </PopoverContent>
      </Popover>
      <Popover shouldBlockScroll onClose={() => handleClose([{propertyName: "minSquareFootage", value: state.minSquareFootage}, {propertyName: 'maxSquareFootage', value: state.maxSquareFootage}])} placement="bottom" color="default">
        <PopoverTrigger>
          <Button color="primary" variant="shadow">
            Square footage
          </Button>
        </PopoverTrigger>
        <PopoverContent  className="w-[240px]">
          <Slider
            label="Square footage"
            minValue={MIN_SQUARE_FOOTAGE}
            maxValue={MAX_SQUARE_FOOTAGE}
            showTooltip
            value={[+state.minSquareFootage, +state.maxSquareFootage]}
            onChange={(value) => dispatch({type: "setSquareFootage", payload: value as number[]})}
            // @ts-expect-error
            getValue={(value) => (
              <>
                {
                  (value as number[]).join("-")
                }
                m<sup>2</sup>
              </>
            )}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default RealEstateSearchForm;
