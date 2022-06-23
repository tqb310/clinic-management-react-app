import serviceFee from '_constants/services';

export default function computeServiceTotalFee(
    serviceList,
) {
    return serviceList.reduce((result, serviceId) => {
        const service = serviceFee.find(
            item => item.id === serviceId,
        );
        if (service) return result + service.serviceFee;
        return result;
    }, 0);
}
