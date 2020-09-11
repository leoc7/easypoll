import React, { useState, useEffect } from 'react';
import { Container, PollCardList, PollCard, PollCardFooter } from './styles';
import { Anchor } from '../../styles/common/input';
import { MdArrowForward } from 'react-icons/md';
import PollCardShimmer from '../../components/Shimmer/PollCard';
import API from '../../services/api';
import moment from 'moment';
require('moment/locale/pt-br');
moment.locale('pt-br');

export default function MyPage() {
    const [newPolls, setNewPolls] = useState([]);
    const [relevantPolls, setRelevantPolls] = useState([]);

    function getPolls() {
        API.get('polls').then(({ data }) => {
            setNewPolls(
                data.map(poll => ({
                    ...poll,
                    date: moment(poll.date).fromNow(),
                }))
            );
        });
        API.get('polls?sort_by=relevant').then(({ data }) => {
            setRelevantPolls(
                data.map(poll => ({
                    ...poll,
                    date: moment(poll.date).fromNow(),
                }))
            );
        });
    }

    useEffect(getPolls, []);

    return (
        <Container>
            <h1>Mais Relevantes</h1>
            <PollCardList>
                {relevantPolls.length > 0 ? (
                    <>
                        {relevantPolls.map(poll => (
                            <PollCard key={poll.id}>
                                <p>{poll.title}</p>
                                <small>{poll.date}</small>
                                <PollCardFooter>
                                    <p>{poll.vote_count} votos</p>
                                    <Anchor href={`/poll/${poll.id}`}>
                                        Votar <MdArrowForward />
                                    </Anchor>
                                </PollCardFooter>
                            </PollCard>
                        ))}
                    </>
                ) : (
                    <>
                        {[...Array(3)].map((element, index) => (
                            <PollCardShimmer key={index}/>
                        ))}
                    </>
                )}
            </PollCardList>
            <h1>Descubra</h1>
            <PollCardList>
                {newPolls.length > 0 ? (
                    <>
                        {newPolls.map(poll => (
                            <PollCard key={poll.id}>
                                <p>{poll.title}</p>
                                <small>{poll.date}</small>
                                <PollCardFooter>
                                    <p>{poll.vote_count} votos</p>
                                    <Anchor href={`/poll/${poll.id}`}>
                                        Votar <MdArrowForward />
                                    </Anchor>
                                </PollCardFooter>
                            </PollCard>
                        ))}
                    </>
                ) : (
                    <>
                        {[...Array(24)].map((element, index) => (
                            <PollCardShimmer key={index} />
                        ))}
                    </>
                )}
            </PollCardList>
        </Container>
    );
}
