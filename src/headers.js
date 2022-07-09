// Columns for react table
export const DOCTORS_COLUMNS = [
    {
        header: () => <span>ID</span>,
        accessorKey: 'id',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>First Name</span>,
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        searchable: true 
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
    },
    {
        header: () => <span>Email</span>,
        accessorKey: 'email',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>Phone</span>,
        accessorKey: 'phone',
        cell: info => info.getValue()?.join(', '),
    },
    {
        header: () => <span>Description</span>,
        accessorKey: 'description',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>Base City</span>,
        accessorKey: 'baseCity',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>PAN</span>,
        accessorKey: 'pan',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>MCI</span>,
        accessorKey: 'mci',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>DOB</span>,
        accessorKey: 'dob',
        cell: info => info.getValue(),
        searchable: true,
        searchType: 'date',
    },
    {
        header: () => <span>TAN</span>,
        accessorKey: 'tan',
        cell: info => info.getValue(),
    },
    {
        header: () => <span>Gender</span>,
        accessorKey: 'gender',
        cell: info => info.getValue()
    },
    {
        header: () => <span>Primary Specialization</span>,
        accessorKey: 'primarySpecialization',
        cell: info => info.getValue()
    },
    {
        header: () => <span>Secondary Specialization</span>,
        accessorKey: 'secondarySpecialization',
        cell: info => info.getValue()
    },
    {
        header: () => <span>Qualifications</span>,
        accessorKey: 'qualifications',
        cell: info => info.getValue()
    },
    {
        header: () => <span>Year Of Experience</span>,
        accessorKey: 'yearOfExperience',
        cell: info => info.getValue()
    },
    {
        header: () => <span>Languages</span>,
        accessorKey: 'languages',
        cell: info => info.getValue()?.join(', ')
    },
    {
        header: () => <span>Places Ids</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.id).join(', ')
    },
    {
        header: () => <span>Places Place Types</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.placeType).join(', ')
    },
    {
        header: () => <span>Places Names</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.name).join(', ')
    },
    {
        header: () => <span>Places Branch Ids</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.branchId).join(', ')
    },
    {
        header: () => <span>Places Branch Names</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.branchName).join(', ')
    },
    {
        header: () => <span>Places ERX Branch Ids</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.erxBranchId).join(', ')
    },
    {
        header: () => <span>Places Latitudes</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.location?.lat).join(', ')
    },
    {
        header: () => <span>Places Longitudes</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.location?.lng).join(', ')
    },
    {
        header: () => <span>Places Addresss</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.address).join(', ')
    },
    {
        header: () => <span>Places City</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.city).join(', ')
    },
    {
        header: () => <span>Places State</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.state).join(', ')
    },
    {
        header: () => <span>Places consultationFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.consultationFee).join(', ')
    },
    {
        header: () => <span>Places followUpFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.followUpFee).join(', ')
    },
    {
        header: () => <span>Places drlConsultationFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.drlConsultationFee).join(', ')
    },
    {
        header: () => <span>Places drlFollowUpFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.drlFollowUpFee).join(', ')
    },
    {
        header: () => <span>Places catalogueConsultationFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.catalogueConsultationFee).join(', ')
    },
    {
        header: () => <span>Places catalogueFollowUpFee</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.catalogueFollowUpFee).join(', ')
    },
    {
        header: () => <span>Places drlPricePercent</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.drlPricePercent).join(', ')
    },
    {
        header: () => <span>Places drlCataloguePricePercent</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.drlCataloguePricePercent).join(', ')
    },
    {
        header: () => <span>Places numberFollowUp</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.numberFollowUp).join(', ')
    },
    {
        header: () => <span>Places followUpDuration</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.followUpDuration).join(', ')
    },
    {
        header: () => <span>Places insuranceProviderId</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.insuranceProviderId).join(', ')
    },
    {
        header: () => <span>Places isActive</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.isActive).join(', ')
    },
    {
        header: () => <span>isActive</span>,
        accessorKey: 'isActive',
        cell: info => info.getValue() ? 'true' : 'false',
        searchable: true,
        searchType: 'dropdown'
    }
]