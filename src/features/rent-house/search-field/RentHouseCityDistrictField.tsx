import { Form, Cascader, CascaderProps } from 'antd'
import { useAppDispatch } from '../../../store.ts'
import { setCityId, setDistrictId } from '../rentHouseSlice.ts'
import { GeoIcon } from '../RentHouseFilterIcons.tsx'

type FieldType = {
  district?: string;
};

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface DistrictFieldProps {
  options: Option[];
  loading: boolean;
}


function RentHouseCityDistrictField({ options, loading }: DistrictFieldProps) {
  const dispatch = useAppDispatch()

  const onCityDistrictChange: CascaderProps<Option>['onChange'] = (value) => {
    if (value && value.length === 2) {
      dispatch(setCityId(parseInt(value[0])))
      dispatch(setDistrictId(parseInt(value[1])))
    }

    if (value && value.length === 1) {
      dispatch(setCityId(0))
      dispatch(setDistrictId(0))
    }
  }

  return (
    <Form.Item<FieldType> name="district">
      <Cascader
        options={options}
        onChange={onCityDistrictChange}
        size="large"
        allowClear={false}
        loading={loading}
        placeholder="Chọn quận huyện"
        suffixIcon={<GeoIcon />}
      />
    </Form.Item>
  )
}

export default RentHouseCityDistrictField
