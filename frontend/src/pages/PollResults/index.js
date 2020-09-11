import React, { useState, useEffect, useRef } from 'react';
import API, { IP } from '../../services/api';
import { Container, ProgressWrapper, ProgressHeader } from './styles';
import ApexChart from 'react-apexcharts';
import { Line } from 'rc-progress';
import { Anchor } from '../../styles/common/input';
import PollResultsShimmer from '../../components/Shimmer/PollResults';
import { MdArrowBack } from 'react-icons/md';

export default function PollResults({ match }) {
    const [poll, setPoll] = useState({});
    const [labels, setLabels] = useState([]);
    const [series, setSeries] = useState([]);
    const [results, setResults] = useState([]);
    const resultsRef = useRef([]);
    const server = useRef(null);

    function getPoll() {
        const pollId = match.params.id;

        API.get(`polls/${pollId}`).then(({ data }) => {
            setPoll(data);
            getResults();
        });
    }

    function getResults() {
        const pollId = match.params.id;

        API.get(`polls/${pollId}/result`).then(({ data }) => {
            const newLabels = [];
            const newSeries = [];

            data.forEach(result => {
                newLabels.push(result.description);
                newSeries.push(result.total);
            });

            const total = data.reduce(
                (accumulator = 0, value) => accumulator + value.total,
                0
            );
            const newResults = [];
            data.forEach(result => {
                newResults.push({
                    ...result,
                    percentage: (result.total * 100) / total,
                });
            });
            resultsRef.current = newResults;
            setResults(newResults);
            setLabels(newLabels);
            setSeries(newSeries);
            startServer(pollId);
        });
    }

    function startServer(pollId) {
        server.current = new WebSocket(`ws://${IP}:8000/ws/poll/${pollId}/`);
        server.current.onmessage = ({ data }) => {
            data = JSON.parse(data);
            increaseVoteCount(data.choice_id);
        };
    }

    function increaseVoteCount(choiceId) {
        resultsRef.current = resultsRef.current.map(result => {
            if (result.id == choiceId) {
                return { ...result, total: result.total + 1 };
            }

            return result;
        });
        setResults(resultsRef.current);
    }

    function updateData() {
        const total = resultsRef.current.reduce(
            (accumulator = 0, value) => accumulator + value.total,
            0
        );
        const newSeries = [];
        const newResults = resultsRef.current.map(result => {
            newSeries.push(result.total);
            return {
                ...result,
                percentage: (result.total * 100) / total,
            };
        });
        setResults(newResults);
        setSeries(newSeries);
    }

    useEffect(getPoll, []);
    useEffect(updateData, [resultsRef.current]);

    return (
        <div>
            <Container>
                {results.length > 0 ? (
                    <>
                        <h1>{poll.title}</h1>
                        <div>
                            {results.map(result => (
                                <ProgressWrapper key={result.id}>
                                    <ProgressHeader>
                                        <p>{result.description}</p>
                                        <strong>{result.total} voto(s)</strong>
                                    </ProgressHeader>
                                    <Line
                                        percent={result.percentage}
                                        strokeWidth={4}
                                        trailWidth={4}
                                        strokeColor='#0384fc'
                                        strokeLinecap='square'
                                    />
                                </ProgressWrapper>
                            ))}
                        </div>
                        <ApexChart
                            options={{
                                chart: {
                                    width: 380,
                                    type: 'donut',
                                },
                                dataLabels: {
                                    style: {
                                        colors: ['white'],
                                        fontFamily: 'Ubuntu',
                                    },
                                    dropShadow: {
                                        enabled: false,
                                    },
                                },
                                labels: labels,
                            }}
                            series={series}
                            type='donut'
                        />
                        <div className='anchor'>
                            <Anchor
                                href={`${match.url.replace('/results', '')}`}
                            >
                                <MdArrowBack /> Votar novamente
                            </Anchor>
                        </div>
                    </>
                ) : (
                    <PollResultsShimmer />
                )}
            </Container>
        </div>
    );
}
