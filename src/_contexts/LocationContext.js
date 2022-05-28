import React, {
    createContext,
    useReducer,
    useContext,
} from 'react';
import ProvinceJson from '_data/tinh_tp.json';
import DistrictJson from '_data/quan_huyen.json';
import WardJson from '_data/require.context';

export const LocationContext = createContext();

export const ProvinceData = Object.values(ProvinceJson);
export const DistrictData = Object.values(DistrictJson);
// export const WardData =  Object.values(WardJson);

//Get the name of province, district, ward code
export function getLocationName(level, code) {
    if (!code) return;
    switch (level) {
        case 'province':
            return ProvinceData.find(
                province => province.code === code,
            ).name;
        case 'district':
            return DistrictData.find(
                district => district.code === code,
            ).name;
        case 'ward':
            return Object.values(WardJson)[code].name;
        default:
            return;
    }
}
//Mapping json data to select data format
export const mapJsonToSelect = (item, index) => {
    return {
        id: index,
        key: item.name,
        value: item.code,
    };
};

const initialValue = {
    provinces: ProvinceData.map(mapJsonToSelect),
    districts: [],
    wards: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_DISTRICT':
            return {
                ...state,
                districts: DistrictData.filter(
                    district =>
                        district.parent_code ===
                        action.payload,
                ).map(mapJsonToSelect),
            };
        case 'UPDATE_WARD':
            // const
            return {
                ...state,
                wards: Object.values(
                    WardJson[action.payload],
                ).map(mapJsonToSelect),
            };
        default:
            return;
    }
};

export const updateDistrict = payload => {
    return {type: 'UPDATE_DISTRICT', payload};
};

export const updateWard = payload => {
    return {type: 'UPDATE_WARD', payload};
};

export const useLocation = () => {
    const state = useContext(LocationContext);
    return {
        onChange: state.onChange,
        provinces: state.provinces,
        districts: state.districts,
        wards: state.wards,
    };
};
function LocationProvider({children}) {
    const [state, dispatch] = useReducer(
        reducer,
        initialValue,
    );
    const {provinces, districts, wards} = state;
    const onChange = e => {
        switch (e.target.name) {
            case 'ADDRESS.province':
                dispatch(updateDistrict(e.target.value));
                break;
            case 'ADDRESS.district':
                dispatch(updateWard(e.target.value));
                break;
            default:
                break;
        }
    };
    return (
        <LocationContext.Provider
            value={{onChange, provinces, districts, wards}}
        >
            {children}
        </LocationContext.Provider>
    );
}

export default LocationProvider;
