import { useContext, useEffect, useState } from "react"
import { Forms } from "../../components/Users/Forms/Forms"
import { Steps } from "../../components/Users/Steps/Steps"
import { StepsContext } from "../../contexts/StepsContext"
import './EditDocument.css'

export function EditDocument({ actualStep }) {

    const { isStepsVisible } = useContext(StepsContext)

    return (
        <article className="container StepsMap">
            {isStepsVisible ? (
                <section>
                    <Steps />
                </section>
            ) :
                < section >
                    <Forms />
                </section>
            }
        </article >
    )
}