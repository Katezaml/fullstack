type UserRecord = {
    name: string;
    answer: &quot;yes&quot; | &quot;no&quot; | &quot;if-needed&quot;;
};
type DateRecord = {
    timestamp: number;
    records: UserRecord[];
};
type PollingEvent = {
    location?: string;
    title: string;
    id: string;
    dates: DateRecord[];
};
type EventsListProps = {
    data: PollingEvent[];
};

const data: PollingEvent[] = [
    {
        title: &quot;Tým building&quot;,

id: 1,
    location: &quot;Praha&quot;;
dates: [
    {
        timestamp: 1726514405258,
        records: [
            { name: &quot;Honza&quot;, answer: &quot;yes&quot; },
{ name: &quot;Jana&quot;, answer: &quot;no&quot; },
],
},
{
    timestamp: 1726600861177,
        records: [{ name: &quot;Jana&quot;, answer: &quot;no&quot; }],
},
],
},
];