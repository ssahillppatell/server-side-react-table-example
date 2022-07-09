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
    },
    {
      accessorFn: row => row.lastName,
      id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    },
    {
        header: () => <span>Phone</span>,
        accessorKey: 'phone',
        cell: info => info.getValue()?.join(', '),
    },
    {
        header: () => <span>Places Name</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.name).join(', '),
    },
    {
        header: () => <span>Places Branch Name</span>,
        accessorKey: 'places',
        cell: info => info.getValue()?.map(place => place.branchName).join(', '),
    }
]