import "./encoded-ocurrences.less";
import { useAppSelector } from "../../context/hooks";

export const EncodedOcurrences: React.FC = () => {
  const encodedChars = useAppSelector<string[]>(
    (state) => state.encode.encodedChars || [],
  );

  const charFrequency = encodedChars.reduce<Record<string, number>>(
    (acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    },
    {},
  );

  return (
    <>
      {encodedChars.length > 0 && (
        <section className="streaming-text__encoded-table">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Number of ocurrences
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Character</th>
                        <th scope="col"># Of Occurrences</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(charFrequency).map(([char, count]) => (
                        <tr key={char}>
                          <th scope="row">{char}</th>
                          <td>{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
