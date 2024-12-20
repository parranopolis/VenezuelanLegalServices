import { useContext, useEffect, useState } from "react"
import { Forms } from "../../components/Forms/Forms"
import { Steps } from "../../components/Steps/Steps"
import { StepsContext } from "../../contexts/StepsContext"

export function EditDocument({ actualStep }) {

    const { isStepsVisible } = useContext(StepsContext)

    return (
        <article className="container">
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