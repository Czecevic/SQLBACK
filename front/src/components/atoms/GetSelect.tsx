export const GetSelect = ({ select, tableData }: any) => {
  const fields = Object.keys(tableData[0]);
  return (
    <>
      {!select ? (
        <p className="text-gray-400">Clique sur un élément pour le voir</p>
      ) : (
        fields.map((field) => (
          <div key={field}>
            <p className="font-bold">
              {field} : {select[field]}
            </p>
          </div>
        ))
      )}
    </>
  );
};
