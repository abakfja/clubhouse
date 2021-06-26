import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

export default function Activity({data}) {
	const date = 13;
	const day = "Wed";
    const events = ["jogging", "music", "coding"]

    useEffect(() =>
    {
        date = data.date;
    }, [data]);
	
    return (
    <div className="flex flex-row">
        <div className="flex flex-col w-1/3">
            {date}
            {day}
        </div>
 
       <div className="flex flex-col">
            {events.map((d) => 
                <div> {d} </div>
            )}
        </div>
    </div>
    );
}